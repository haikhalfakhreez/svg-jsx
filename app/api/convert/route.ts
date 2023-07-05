import JSZip from 'jszip'
import { transformAsync } from '@babel/core'
// @ts-ignore: no types available
import transfromJsx from '@babel/plugin-transform-react-jsx'
import jsx from '@svgr/plugin-jsx'
import svgo from '@svgr/plugin-svgo'
import prettier from '@svgr/plugin-prettier'
import { transform, type Config } from '@svgr/core'

const outlineConfig: Config = {
  plugins: [svgo, jsx, prettier],
  svgo: true,
  svgoConfig: {
    plugins: [
      { name: 'removeDimensions' },
      { name: 'sortAttrs' },
      {
        name: 'convertColors',
        params: {
          currentColor: true,
        },
      },
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              'aria-hidden': 'true',
            },
          ],
        },
      },
    ],
  },
}

export async function POST(request: Request) {
  const { svg, name } = await request.json()

  const component = await transform(svg, outlineConfig, {
    componentName: name,
  })

  const result = await transformAsync(component, {
    plugins: [[transfromJsx, { useBuiltIns: true }]],
  })

  if (!result || !result.code) {
    return new Response('Error', { status: 500 })
  }

  const { code } = result
  const types = `import * as React from 'react';\ndeclare function ${name}(props: React.ComponentProps<'svg'>): JSX.Element;\nexport default ${name};\n`

  const zip = new JSZip()

  zip.file(`${name}.js`, code)
  zip.file(`${name}.d.ts`, types)

  const data = await zip.generateAsync({ type: 'nodebuffer' })

  return new Response(data, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${name}.zip`,
    },
  })
}
