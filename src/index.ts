export const useStorybook = ({
  component,
  componentName,
  CodeViewer,
}: {
  component: { [name in string]: unknown }
  componentName: string
  CodeViewer: unknown
}) => {
  let props = {}
  const generateCode = () => {
    let propValues: string[] = []
    try {
      for (const argumentName of Object.keys(props))
        propValues.push(`${argumentName}="${props[argumentName]}"`)
    } catch (e) {}
    return `<${componentName} ${propValues.join(' ')}/>`
  }
  return {
    template: (args, { argTypes }) => {
      props = args
      let propValues: string[] = []
      try {
        for (const argumentName of Object.keys(props))
          propValues.push(`:${argumentName}="${argumentName}"`)
      } catch (e) {}
      const template = `<${componentName} ${propValues.join(' ')}/>`
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
