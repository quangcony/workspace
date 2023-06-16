import React from 'react'
import i18n from '../../../lib/Language'

const Footer = () => {
  return (
			<footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small">
  <p className="text-muted mb-1 mb-md-0">{i18n.t("general.lblCopyright")} <a href target="_blank">{process.env.REACT_APP_ORGANIZATION}</a>.</p>
</footer>

  )
}

export default Footer