import { MailOutlined } from '@ant-design/icons'
import React from 'react'

const Mail = () => {
  return (
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="messageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <MailOutlined />
          </a>
          <div className="dropdown-menu p-0" aria-labelledby="messageDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                  <p>9 New Messages</p>
                  <a href="javascript:;" className="text-muted">Clear all</a>
              </div>
              <div className="p-1">
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="me-3">
                          <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face2.jpg" alt="userr" />
                      </div>
                      <div className="d-flex justify-content-between flex-grow-1">
                          <div className="me-4">
                              <p>Leonardo Payne</p>
                              <p className="tx-12 text-muted">Project status</p>
                          </div>
                          <p className="tx-12 text-muted">2 min ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="me-3">
                          <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face3.jpg" alt="userr" />
                      </div>
                      <div className="d-flex justify-content-between flex-grow-1">
                          <div className="me-4">
                              <p>Carl Henson</p>
                              <p className="tx-12 text-muted">Client meeting</p>
                          </div>
                          <p className="tx-12 text-muted">30 min ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="me-3">
                          <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face4.jpg" alt="userr" />
                      </div>
                      <div className="d-flex justify-content-between flex-grow-1">
                          <div className="me-4">
                              <p>Jensen Combs</p>
                              <p className="tx-12 text-muted">Project updates</p>
                          </div>
                          <p className="tx-12 text-muted">1 hrs ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="me-3">
                          <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face5.jpg" alt="userr" />
                      </div>
                      <div className="d-flex justify-content-between flex-grow-1">
                          <div className="me-4">
                              <p>Amiah Burton</p>
                              <p className="tx-12 text-muted">Project deatline</p>
                          </div>
                          <p className="tx-12 text-muted">2 hrs ago</p>
                      </div>
                  </a>
                  <a href="javascript:;" className="dropdown-item d-flex align-items-center py-2">
                      <div className="me-3">
                          <img className="wd-30 ht-30 rounded-circle" src="../assets/images/faces/face6.jpg" alt="userr" />
                      </div>
                      <div className="d-flex justify-content-between flex-grow-1">
                          <div className="me-4">
                              <p>Yaretzi Mayo</p>
                              <p className="tx-12 text-muted">New record</p>
                          </div>
                          <p className="tx-12 text-muted">5 hrs ago</p>
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

export default Mail