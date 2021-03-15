import React from 'react';

export default function Company({ data, index }) {
  const companyElement = data;
  const i = index;
  return <span>{`${i ? ', ' : ''} ${companyElement.name}`}</span>;
}
