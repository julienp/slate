/** @jsx h */

import h from '../../../helpers/h'

export default function(change) {
  change.setBlock({ type: 'code' })
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />word
      </paragraph>
      <paragraph>
        <focus />another
      </paragraph>
    </document>
  </value>
)

export const output = (
  <value>
    <document>
      <code>
        <anchor />word
      </code>
      <code>
        <focus />another
      </code>
    </document>
  </value>
)
