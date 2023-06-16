import { BellOutlined } from '@ant-design/icons'
import React from 'react'

const Notice = () => {
  return (
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <BellOutlined />
              <div className="indicator">
                  <div className="circle" />
              </div>
          </a>
          <div className="dropdown-menu p-0" aria-labelledby="notificationDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                  <p>6 New Notifications</p>
                  <a href="javascript:;" className="text-muted">Clear all</a>
              </div>
              <div className="p-1">
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                          <i className="icon-sm text-white" data-feather="gift" />
                      </div>
                      <div className="flex-grow-1 me-2">
                          <p>New Order Recieved</p>
                          <p className="tx-12 text-muted">30 min ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                          <i className="icon-sm text-white" data-feather="alert-circle" />
                      </div>
                      <div className="flex-grow-1 me-2">
                          <p>Server Limit Reached!</p>
                          <p className="tx-12 text-muted">1 hrs ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                          <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face6.jpg" alt="userr" />
                      </div>
                      <div className="flex-grow-1 me-2">
                          <p>New customer registered</p>
                          <p className="tx-12 text-muted">2 sec ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                          <i className="icon-sm text-white" data-feather="layers" />
                      </div>
                      <div className="flex-grow-1 me-2">
                          <p>Apps are ready for update</p>
                          <p className="tx-12 text-muted">5 hrs ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                          <i className="icon-sm text-white" data-feather="download" />
                      </div>
                      <div className="flex-grow-1 me-2">
                          <p>Download completed</p>
                          <p className="tx-12 text-muted">6 hrs ago</p>
                      </div>
                  </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                  <a href="javascript:;">View all</a>
              </div>
          </div>
      </li>
  )
}

export default Notice