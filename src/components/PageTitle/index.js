import React from 'react';
import { Helmet } from 'react-helmet';

export default function PageTitle({ header, description, link }) {
  return (<Helmet>
    <meta charSet="utf-8"/>
    <title>Waziki || {header}</title>
    {description ? (<meta name="description" content={description}/>) : ''}
    {link ? (<link rel="canonical" href={`https://www.wazikilife.com${link}`}/>) : ''}
  </Helmet>);
}