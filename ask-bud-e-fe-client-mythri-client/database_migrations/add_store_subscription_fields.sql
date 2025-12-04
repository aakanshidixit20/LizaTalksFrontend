-- Migration: Add new fields to client_store and create client_subscription table
-- Date: 2025-10-30
-- Purpose: Support new store creation flow with subscription management

-- ============================================
-- 1. Add new columns to client_store table
-- ============================================

-- Add contact information fields
ALTER TABLE client_store 
ADD COLUMN IF NOT EXISTS contact_person_name VARCHAR(255);

ALTER TABLE client_store 
ADD COLUMN IF NOT EXISTS contact_email_id VARCHAR(255);

ALTER TABLE client_store 
ADD COLUMN IF NOT EXISTS domain_url VARCHAR(500);

-- Add subscription status fields
ALTER TABLE client_store 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT false;

ALTER TABLE client_store 
ADD COLUMN IF NOT EXISTS is_subscribed BOOLEAN DEFAULT false;

ALTER TABLE client_store 
ADD COLUMN IF NOT EXISTS is_widget_active BOOLEAN DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN client_store.contact_person_name IS 'Primary contact person for the store';
COMMENT ON COLUMN client_store.contact_email_id IS 'Contact email for store communications';
COMMENT ON COLUMN client_store.domain_url IS 'Store website URL';
COMMENT ON COLUMN client_store.is_active IS 'Whether the store is active';
COMMENT ON COLUMN client_store.is_subscribed IS 'Whether the store has an active subscription';
COMMENT ON COLUMN client_store.is_widget_active IS 'Whether the chatbot widget is active';

-- ============================================
-- 2. Create client_subscription table
-- ============================================

CREATE TABLE IF NOT EXISTS client_subscription (
  client_subscription_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  client_store_id UUID NOT NULL,
  
  -- Subscription period
  start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  end_date TIMESTAMP WITHOUT TIME ZONE, -- NULL for ongoing subscriptions
  next_billing_date TIMESTAMP WITHOUT TIME ZONE,
  
  -- Plan details
  plan_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  plan_features JSONB, -- Store plan details as JSON
  
  -- Payment status
  last_payment_status VARCHAR(50) DEFAULT 'pending', -- pending, success, failed
  subscription_status VARCHAR(50) DEFAULT 'pending', -- pending, active, cancelled, expired
  payment_mode VARCHAR(50) DEFAULT 'online', -- online, offline
  grace_period_flag BOOLEAN DEFAULT false,
  
  -- Fluidpay integration
  sidglo_subscription_id VARCHAR(255), -- Fluidpay subscription ID
  sidglo_subscription_url TEXT, -- Fluidpay subscription management URL
  
  -- Audit fields
  created_by VARCHAR(255),
  created_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  modified_by VARCHAR(255),
  modified_date TIMESTAMP WITHOUT TIME ZONE,
  
  -- Constraints
  CONSTRAINT client_subscription_client_id_fkey FOREIGN KEY (client_id) REFERENCES client(client_id),
  CONSTRAINT client_subscription_client_store_id_fkey FOREIGN KEY (client_store_id) REFERENCES client_store(client_store_id)
);

-- Create unique index to ensure one subscription per store
CREATE UNIQUE INDEX IF NOT EXISTS uq_client_subscription_store 
ON client_subscription(client_store_id);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_client_subscription_client_id 
ON client_subscription(client_id);

CREATE INDEX IF NOT EXISTS idx_client_subscription_status 
ON client_subscription(subscription_status);

CREATE INDEX IF NOT EXISTS idx_client_subscription_next_billing 
ON client_subscription(next_billing_date) 
WHERE subscription_status = 'active';

-- Add comments
COMMENT ON TABLE client_subscription IS 'Stores subscription information for each client store';
COMMENT ON COLUMN client_subscription.plan_features IS 'JSON object containing plan details: {plan_code, plan_name, billing_cycle, quantity}';
COMMENT ON COLUMN client_subscription.last_payment_status IS 'Status of the most recent payment attempt';
COMMENT ON COLUMN client_subscription.subscription_status IS 'Current status of the subscription';
COMMENT ON COLUMN client_subscription.sidglo_subscription_id IS 'Fluidpay subscription identifier';

-- ============================================
-- 3. Verify the changes
-- ============================================

-- Check client_store columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'client_store'
AND column_name IN ('contact_person_name', 'contact_email_id', 'domain_url', 'is_active', 'is_subscribed', 'is_widget_active')
ORDER BY column_name;

-- Check client_subscription table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'client_subscription'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'client_subscription';

PRINT '✅ Migration completed successfully!';

