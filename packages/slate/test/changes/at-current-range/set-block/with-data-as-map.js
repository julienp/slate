/** @jsx h */

import h from '../../../helpers/h'
import { Data } from '../../../..'

export default function(change) {
  change.setBlock({
    type: 'code',
    data: Data.create({ thing: 'value' }),
  })
}

export const input = (
  <value>
    <document>
      <paragraph>
        <cursor />word
      </paragraph>
    </document>
  </value>
)

export const output = (
  <value>
    <document>
      <code thing="value">
        <cursor />word
      </code>
    </document>
  </value>
)
