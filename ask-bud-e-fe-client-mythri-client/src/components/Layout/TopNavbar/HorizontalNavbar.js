"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const HorizontalNavbar = () => {
  const location = useLocation(); // Get current location/pathname
  const isActiveLink = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <div className="horizontal-navbar-area">
        <div className="accordion">
          {/* Max 7 accordion-item in this list */}
          <div className="accordion-item megamenu">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">dashboard</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Dashboard
              </span>
              <span className="trezo-badge">25</span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/ecommerce"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/ecommerce"
                    )}`}
                  >
                    eCommerce
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/crm"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/crm"
                    )}`}
                  >
                    CRM
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/project-management"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/project-management"
                    )}`}
                  >
                    Project Management
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/lms"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/lms"
                    )}`}
                  >
                    LMS
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/helpdesk"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/helpdesk"
                    )}`}
                  >
                    HelpDesk
                    <span className="trezo-badge">Hot</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/analytics"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/analytics"
                    )}`}
                  >
                    Analytics
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/crypto"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/crypto"
                    )}`}
                  >
                    Crypto
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/sales"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/sales"
                    )}`}
                  >
                    Sales
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/hospital"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/hospital"
                    )}`}
                  >
                    Hospital
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/hrm"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/hrm"
                    )}`}
                  >
                    HRM
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/school"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/school"
                    )}`}
                  >
                    School
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/call-center"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/call-center"
                    )}`}
                  >
                    Call Center
                    <span className="trezo-badge style-two">Popular</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/marketing"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/marketing"
                    )}`}
                  >
                    Marketing
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/nft"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/nft"
                    )}`}
                  >
                    NFT
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/saas"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/saas"
                    )}`}
                  >
                    SaaS
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/real-estate"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/real-estate"
                    )}`}
                  >
                    Real Estate
                    <span className="trezo-badge style-three">Top</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/shipment"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/shipment"
                    )}`}
                  >
                    Shipment
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/finance"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/finance"
                    )}`}
                  >
                    Finance
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/pos-system"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/pos-system"
                    )}`}
                  >
                    POS System
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/podcast"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/podcast"
                    )}`}
                  >
                    Podcast
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/social-media"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/social-media"
                    )}`}
                  >
                    Social Media
                    <span className="trezo-badge">New</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/doctor"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/doctor"
                    )}`}
                  >
                    Doctor
                    <span className="trezo-badge">New</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/beauty-salon"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/beauty-salon"
                    )}`}
                  >
                    Beauty Salon
                    <span className="trezo-badge">New</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/store-analytics"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/store-analytics"
                    )}`}
                  >
                    Store Analytics
                    <span className="trezo-badge">New</span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/dashboard/restaurant"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/dashboard/restaurant"
                    )}`}
                  >
                    Restaurant
                    <span className="trezo-badge">New</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item border-radius border-0">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">deployed_code</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Apps
              </span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Link
                    to="/apps/to-do-list"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/apps/to-do-list"
                    )}`}
                  >
                    <i className="material-symbols-outlined">
                      format_list_bulleted
                    </i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      To Do List
                    </span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/apps/calendar"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/apps/calendar"
                    )}`}
                  >
                    <i className="material-symbols-outlined">date_range</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Calendar
                    </span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/apps/contacts"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/apps/contacts"
                    )}`}
                  >
                    <i className="material-symbols-outlined">contact_page</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Contacts
                    </span>
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/apps/chat"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/apps/chat"
                    )}`}
                  >
                    <i className="material-symbols-outlined">chat</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Chat
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">mail</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Email
                    </span>
                    <span className="trezo-badge style-two">3</span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/email"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/email"
                          )}`}
                        >
                          Inbox
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/email/compose"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/emailcompose"
                          )}`}
                        >
                          Compose
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/email/read"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/email/read"
                          )}`}
                        >
                          Read
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/apps/kanban-board"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/apps/kanban-board"
                    )}`}
                  >
                    <i className="material-symbols-outlined">team_dashboard</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Kanban Board
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">folder_open</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      File Manager
                    </span>
                    <span className="trezo-badge style-three">7</span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager"
                          )}`}
                        >
                          My Drive
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager/assets"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager/assets"
                          )}`}
                        >
                          Assets
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager/projects"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager/projects"
                          )}`}
                        >
                          Projects
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager/personal"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager/personal"
                          )}`}
                        >
                          Personal
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager/applications"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager/applications"
                          )}`}
                        >
                          Applications
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager/documents"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager/documents"
                          )}`}
                        >
                          Documents
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/apps/file-manager/media"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/apps/file-manager/media"
                          )}`}
                        >
                          Media
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item border-radius border-0">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">layers</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Pages
              </span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">note_stack</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Front Pages
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <a href="/" className="sidemenu-link border-radius">
                          Home
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/front-pages/features"
                          className="sidemenu-link border-radius"
                        >
                          Features
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/front-pages/team"
                          className="sidemenu-link border-radius"
                        >
                          Our Team
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/front-pages/faq"
                          className="sidemenu-link border-radius"
                        >
                          FAQ’s
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/front-pages/contact"
                          className="sidemenu-link border-radius"
                        >
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">shopping_cart</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      eCommerce
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Button type="button" className="accordion-button">
                          Products
                        </Button>
                        <div className="accordion-body border-radius">
                          <ul className="sidebar-sub-menu">
                            <li className="sidemenu-item">
                              <Link
                                to="/ecommerce/products-grid"
                                className={`sidemenu-link border-radius ${isActiveLink(
                                  "/ecommerce/products-grid"
                                )}`}
                              >
                                Products Grid
                              </Link>
                            </li>
                            <li className="sidemenu-item">
                              <Link
                                to="/ecommerce/products-list"
                                className={`sidemenu-link border-radius ${isActiveLink(
                                  "/ecommerce/products-list"
                                )}`}
                              >
                                Products List
                              </Link>
                            </li>
                            <li className="sidemenu-item">
                              <Link
                                to="/ecommerce/products-list/details"
                                className={`sidemenu-link border-radius ${isActiveLink(
                                  "/ecommerce/products-list/details"
                                )}`}
                              >
                                Product Details
                              </Link>
                            </li>
                            <li className="sidemenu-item">
                              <Link
                                to="/ecommerce/create-product"
                                className={`sidemenu-link border-radius ${isActiveLink(
                                  "/ecommerce/create-product"
                                )}`}
                              >
                                Create Product
                              </Link>
                            </li>
                            <li className="sidemenu-item">
                              <Link
                                to="/ecommerce/edit-product"
                                className={`sidemenu-link border-radius ${isActiveLink(
                                  "/ecommerce/edit-product"
                                )}`}
                              >
                                Edit Product
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/cart"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/cart"
                          )}`}
                        >
                          Cart
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/checkout"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/checkout"
                          )}`}
                        >
                          Checkout
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/orders"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/orders"
                          )}`}
                        >
                          Orders
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/orders/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/orders/details"
                          )}`}
                        >
                          Order Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/orders/create"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/orders/create"
                          )}`}
                        >
                          Create Order
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/orders/tracking"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/orders/tracking"
                          )}`}
                        >
                          Order Tracking
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/customers"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/customers"
                          )}`}
                        >
                          Customers
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/customers/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/customers/details"
                          )}`}
                        >
                          Customer Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/categories"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/categories"
                          )}`}
                        >
                          Categories
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/sellers"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/sellers"
                          )}`}
                        >
                          Sellers
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/sellers/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/sellers/details"
                          )}`}
                        >
                          Seller Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/sellers/create"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/sellers/create"
                          )}`}
                        >
                          Create Seller
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/reviews"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/reviews"
                          )}`}
                        >
                          Reviews
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/ecommerce/refunds"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ecommerce/refunds"
                          )}`}
                        >
                          Refunds
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">handshake</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      CRM
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/crm/contacts"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/crm/contacts"
                          )}`}
                        >
                          Contacts
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/crm/customers"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/crm/customers"
                          )}`}
                        >
                          Customers
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/crm/leads"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/crm/leads"
                          )}`}
                        >
                          Leads
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/crm/deals"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/crm/deals"
                          )}`}
                        >
                          Deals
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">description</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Project Management
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/project-overview"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/project-overview"
                          )}`}
                        >
                          Project Overview
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/projects-list"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/projects-list"
                          )}`}
                        >
                          Projects List
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/create-project"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/create-project"
                          )}`}
                        >
                          Create Project
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/clients"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/clients"
                          )}`}
                        >
                          Clients
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/teams"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/teams"
                          )}`}
                        >
                          Teams
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/kanban-board"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/kanban-board"
                          )}`}
                        >
                          Kanban Board
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/project-management/users"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/project-management/users"
                          )}`}
                        >
                          Users
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">auto_stories</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      LMS
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/lms/courses"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/lms/courses"
                          )}`}
                        >
                          Courses List
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/lms/courses/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/lms/courses/details"
                          )}`}
                        >
                          Course Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/lms/lesson-preview"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/lms/lesson-preview"
                          )}`}
                        >
                          Lesson Preview
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/lms/create-course"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/lms/create-course"
                          )}`}
                        >
                          Create Course
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/lms/edit-course"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/lms/edit-course"
                          )}`}
                        >
                          Edit Course
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/lms/instructors"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/lms/instructors"
                          )}`}
                        >
                          Instructors
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">support</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      HelpDesk
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/helpdesk/tickets"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/helpdesk/tickets"
                          )}`}
                        >
                          Tickets
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/helpdesk/tickets/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/helpdesk/tickets/details"
                          )}`}
                        >
                          Ticket Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/helpdesk/agents"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/helpdesk/agents"
                          )}`}
                        >
                          Agents
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/helpdesk/reports"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/helpdesk/reports"
                          )}`}
                        >
                          Reports
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">store</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      NFT Marketplace
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/marketplace"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/marketplace"
                          )}`}
                        >
                          Marketplace
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/explore-all"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/explore-all"
                          )}`}
                        >
                          Explore All
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/live-auction"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/live-auction"
                          )}`}
                        >
                          Live Auction
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/details"
                          )}`}
                        >
                          NFT Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/creators"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/creators"
                          )}`}
                        >
                          Creators
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/creators/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/creators/details"
                          )}`}
                        >
                          Creator Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/nft/wallet-connect"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/nft/wallet-connect"
                          )}`}
                        >
                          Wallet Connect
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">
                      real_estate_agent
                    </i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Real Estate
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/property-list"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/property-list"
                          )}`}
                        >
                          Property List
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/property-details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/property-details"
                          )}`}
                        >
                          Property Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/add-property"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/add-property"
                          )}`}
                        >
                          Add Property
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/agents"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/agents"
                          )}`}
                        >
                          Agents
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/agents/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/agents/details"
                          )}`}
                        >
                          Agent Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/agents/add"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/agents/add"
                          )}`}
                        >
                          Add Agent
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/real-estate/customers"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/real-estate/customers"
                          )}`}
                        >
                          Customers
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">calculate</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Finance
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/finance/wallet"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/finance/wallet"
                          )}`}
                        >
                          Wallet
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/finance/transactions"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/finance/transactions"
                          )}`}
                        >
                          Transactions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">local_activity</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Events
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/events"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/events"
                          )}`}
                        >
                          Events Grid
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/events/list"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/events/list"
                          )}`}
                        >
                          Events List
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/events/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/events/details"
                          )}`}
                        >
                          Event Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/events/create-an-event"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/events/create-an-event"
                          )}`}
                        >
                          Create An Event
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/events/edit-an-event"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/events/edit-an-event"
                          )}`}
                        >
                          Edit An Event
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">share</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Social
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/social/profile"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/social/profile"
                          )}`}
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/social/settings"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/social/settings"
                          )}`}
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">content_paste</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Invoices
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/invoices"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/invoices"
                          )}`}
                        >
                          Invoices
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/invoices/details"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/invoices/details"
                          )}`}
                        >
                          Invoice Details
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/invoices/create"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/invoices/create"
                          )}`}
                        >
                          Create Invoice
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/invoices/edit"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/invoices/edit"
                          )}`}
                        >
                          Edit Invoice
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">person</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Users
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/users"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/users"
                          )}`}
                        >
                          Team Members
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/users/users-list"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/users/users-list"
                          )}`}
                        >
                          Users List
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/users/add-user"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/users/add-user"
                          )}`}
                        >
                          Add User
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">account_box</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Profile
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/profile"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/profile"
                          )}`}
                        >
                          User Profile
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/profile/teams"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/profile/teams"
                          )}`}
                        >
                          Teams
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/profile/projects"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/profile/projects"
                          )}`}
                        >
                          Projects
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/starter"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/starter"
                    )}`}
                  >
                    <i className="material-symbols-outlined">star_border</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Starter
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item border-radius border-0">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">token</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Modules
              </span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">qr_code_scanner</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      UI Elements
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/autocomplete"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/autocomplete"
                          )}`}
                        >
                          Autocomplete
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/buttons"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/buttons"
                          )}`}
                        >
                          Buttons
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/checkbox"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/checkbox"
                          )}`}
                        >
                          Checkbox
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/radio"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/radio"
                          )}`}
                        >
                          Radio
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/rating"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/rating"
                          )}`}
                        >
                          Rating
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/select"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/select"
                          )}`}
                        >
                          Select
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/slider"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/slider"
                          )}`}
                        >
                          Slider
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/avatar"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/avatar"
                          )}`}
                        >
                          Avatar
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/badge"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/badge"
                          )}`}
                        >
                          Badge
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/alerts"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/alerts"
                          )}`}
                        >
                          Alerts
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/progress"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/progress"
                          )}`}
                        >
                          Progress
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/accordion"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/accordion"
                          )}`}
                        >
                          Accordion
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/card"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/card"
                          )}`}
                        >
                          Card
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Link
                          to="/ui-kit/tabs"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/ui-kit/tabs"
                          )}`}
                        >
                          Tabs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">emoji_emotions</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Icons
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/icons/material-symbols"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/icons/material-symbols"
                          )}`}
                        >
                          Material Symbols
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/icons/remixicon"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/icons/remixicon"
                          )}`}
                        >
                          RemixIcon
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/tables"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/tables"
                    )}`}
                  >
                    <i className="material-symbols-outlined">table_chart</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Tables
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">lock_open</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Authentication
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/sign-in/"
                          className="sidemenu-link border-radius"
                        >
                          Sign In
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/sign-up/"
                          className="sidemenu-link border-radius"
                        >
                          Sign Up
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/forgot-password/"
                          className="sidemenu-link border-radius"
                        >
                          Forgot Password
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/reset-password/"
                          className="sidemenu-link border-radius"
                        >
                          Reset Password
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/confirm-email/"
                          className="sidemenu-link border-radius"
                        >
                          Confirm Email
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/lock-screen/"
                          className="sidemenu-link border-radius"
                        >
                          Lock Screen
                        </a>
                      </li>
                      <li className="sidemenu-item">
                        <a
                          href="/authentication/logout/"
                          className="sidemenu-link border-radius"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">content_copy</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Extra Pages
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/pricing"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/pricing"
                          )}`}
                        >
                          Pricing
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/timeline"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/timeline"
                          )}`}
                        >
                          Timeline
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/faq"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/faq"
                          )}`}
                        >
                          FAQ
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/gallery"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/gallery"
                          )}`}
                        >
                          Gallery
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/testimonials"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/testimonials"
                          )}`}
                        >
                          Testimonials
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/search"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/search"
                          )}`}
                        >
                          Search
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/blank-page"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "//blank-page"
                          )}`}
                        >
                          Blank Page
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">error</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Errors
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/not-found"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/not-found"
                          )}`}
                        >
                          404 Error Page
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/internal-error"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/internal-error"
                          )}`}
                        >
                          Internal Error
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/widgets"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/widgets"
                    )}`}
                  >
                    <i className="material-symbols-outlined">widgets</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Widgets
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/maps"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/maps"
                    )}`}
                  >
                    <i className="material-symbols-outlined">map</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Maps
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/notifications"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/notifications"
                    )}`}
                  >
                    <i className="material-symbols-outlined">notifications</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Notifications
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Link
                    to="/members"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/members"
                    )}`}
                  >
                    <i className="material-symbols-outlined">people</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Members
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item border-radius border-0">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">forum</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Forms
              </span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Link
                    to="/forms/basic-elements"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/forms/basic-elements"
                    )}`}
                  >
                    Basic Elements
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/forms/advanced-elements"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/forms/advanced-elements"
                    )}`}
                  >
                    Advanced Elements
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/forms/editors"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/forms/editors"
                    )}`}
                  >
                    Editors
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/forms/file-uploader"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/forms/file-uploader"
                    )}`}
                  >
                    File Upload
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item border-radius border-0">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">pie_chart</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Charts
              </span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Link
                    to="/charts/line"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/line"
                    )}`}
                  >
                    Line
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/area"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/area"
                    )}`}
                  >
                    Area
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/column"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/column"
                    )}`}
                  >
                    Column
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/mixed"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/mixed"
                    )}`}
                  >
                    Mixed
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/radialbar"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/radialbar"
                    )}`}
                  >
                    RadialBar
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/radar"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/radar"
                    )}`}
                  >
                    Radar
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/pie"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/pie"
                    )}`}
                  >
                    Pie
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/polar"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/polar"
                    )}`}
                  >
                    Polar
                  </Link>
                </li>
                <li className="sidemenu-item">
                  <Link
                    to="/charts/more"
                    className={`sidemenu-link border-radius ${isActiveLink(
                      "/charts/more"
                    )}`}
                  >
                    More
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item border-radius border-0">
            <Button type="button" className="accordion-button">
              <i className="material-symbols-outlined">open_run</i>
              <span className="title" style={{ lineHeight: 1 }}>
                Others
              </span>
            </Button>
            <div className="accordion-body border-radius">
              <ul className="sidebar-sub-menu">
                <li className="sidemenu-item">
                  <Link
                    to="/my-profile"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/my-profile"
                    )}`}
                  >
                    <i className="material-symbols-outlined">account_circle</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      My Profile
                    </span>
                  </Link>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">settings</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Settings
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link
                          to="/settings/account-settings"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/settings/account-settings"
                          )}`}
                        >
                          Account Settings
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/settings/change-password"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/settings/change-password"
                          )}`}
                        >
                          Change Password
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/settings/connections"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/settings/connections"
                          )}`}
                        >
                          Connections
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/settings/privacy-policy"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/settings/privacy-policy"
                          )}`}
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link
                          to="/settings/terms-conditions"
                          className={`sidemenu-link border-radius ${isActiveLink(
                            "/settings/terms-conditions"
                          )}`}
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <Button
                    type="button"
                    className="accordion-button with-icon border-radius"
                  >
                    <i className="material-symbols-outlined">unfold_more</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Multi Level Menu
                    </span>
                  </Button>
                  <div className="accordion-body border-radius">
                    <ul className="sidebar-sub-menu">
                      <li className="sidemenu-item">
                        <Link to="#" className="sidemenu-link border-radius">
                          First
                        </Link>
                      </li>
                      <li className="sidemenu-item">
                        <Link to="#" className="sidemenu-link border-radius">
                          Third
                        </Link>
                      </li>

                      <li className="sidemenu-item">
                        <Button type="button" className="accordion-button">
                          Third
                          <span className="trezo-badge">3</span>
                        </Button>
                        <div className="accordion-body border-radius">
                          <ul className="sidebar-sub-menu">
                            <li className="sidemenu-item">
                              <Link
                                to="#"
                                className="sidemenu-link border-radius"
                              >
                                Third 1
                              </Link>
                            </li>

                            <li className="sidemenu-item">
                              <Button
                                type="button"
                                className="accordion-button"
                              >
                                Third 2
                              </Button>
                              <div className="accordion-body border-radius">
                                <ul className="sidebar-sub-menu">
                                  <li className="sidemenu-item">
                                    <Link
                                      to="#"
                                      className="sidemenu-link border-radius"
                                    >
                                      Four 1
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="sidemenu-item">
                              <Link
                                to="#"
                                className="sidemenu-link border-radius"
                              >
                                Third 3
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="sidemenu-item">
                  <a
                    href="/authentication/logout/"
                    className={`sidemenu-link with-icon border-radius ${isActiveLink(
                      "/authentication/logout/"
                    )}`}
                  >
                    <i className="material-symbols-outlined">logout</i>
                    <span className="title" style={{ lineHeight: 1 }}>
                      Logout
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalNavbar;
