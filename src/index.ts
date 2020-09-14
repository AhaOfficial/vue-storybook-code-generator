export const useStorybook = ({
  component,
  componentName,
  componentInner,
  CodeViewer,
}: {
  component: { [name in string]: unknown }
  componentName: string
  componentInner?: string
  CodeViewer: unknown
}) => {
  let props = {}
  const generateCode = () => {
    let propValues: string[] = []
    try {
      for (const argumentName of Object.keys(props))
        propValues.push(`${argumentName}="${props[argumentName]}"`)
    } catch (e) {}
    let template = `<${componentName} ${propValues.join(' ')}/>`
    if(typeof componentInner == 'string' && componentInner.length > 0)
      template = `<${componentName} ${propValues.join(' ')}>${componentInner}</${componentName}>`
    return template
  }
  return {
    template: (args, { argTypes }) => {
      props = args
      let propValues: string[] = []
      try {
        for (const argumentName of Object.keys(props))
          propValues.push(`:${argumentName}="${argumentName}"`)
      } catch (e) {}
      let template = `<${componentName} ${propValues.join(' ')}/>`
      if(typeof componentInner == 'string'  && componentInner.length > 0)
        template = `<${componentName} ${propValues.join(' ')}>${componentInner}</${componentName}>`
      return {
        props: Object.keys(argTypes),
        components: component,
        template,
      }
    },
    code: (args, { argTypes }) => {
      return {
        props: {},
        components: { CodeViewer },
        template: `<CodeViewer code='${generateCode()}' />`,
      }
    },
  }
}
