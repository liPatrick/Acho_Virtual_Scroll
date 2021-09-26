import * as React from 'react';

export default function Cell({
  content,
  header,
  nullContent, 
}) {

  const cellMarkup = header ? (
    <th className="Cell Cell-header">
      {content}
    </th>
  ) : ( nullContent ? <td className="Cell-null Cell-body"> null </td> : <td className="Cell-body"> {content} </td> );

  return (cellMarkup);
}

