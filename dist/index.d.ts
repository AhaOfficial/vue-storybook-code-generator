export declare const useStorybook: ({ component, componentName, CodeViewer, }: {
    component: {
        [x: string]: unknown;
    };
    componentName: string;
    CodeViewer: unknown;
}) => {
    template: (args: any, { argTypes }: {
        argTypes: any;
    }) => {
        props: string[];
        components: {
            [x: string]: unknown;
        };
        template: string;
    };
    code: (args: any, { argTypes }: {
        argTypes: any;
    }) => {
        props: {};
        components: {
            CodeViewer: unknown;
        };
        template: string;
    };
};
