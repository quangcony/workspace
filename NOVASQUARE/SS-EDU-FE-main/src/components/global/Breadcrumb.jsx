import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const BreadcrumbProvider = ({item,adrress}) => {
  return (
      <nav className="page-breadcrumb">
      <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
              <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {
            item && item.length > 0 && item.map((el,index)=>(
                <Breadcrumb.Item key={index} >
                    <Link to={el.link}>{el.label}</Link>
                </Breadcrumb.Item>
            ))
          }
          <Breadcrumb.Item>{adrress}</Breadcrumb.Item>
      </Breadcrumb>
      </nav>
  )
}

export default BreadcrumbProvider