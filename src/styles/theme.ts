import {
    Avatar,
    Breadcrumbs,
    Button,
    createTheme,
    Modal,
    Notification,
    Pagination,
    PasswordInput,
    Select,
    Table,
    Textarea,
    TextInput,
} from '@mantine/core';

export const theme = createTheme({
    /* Put your mantine theme override here */

    //breakpoints
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },

    //font Family
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',

    //font size
    fontSizes: {
        xs: '0.6rem',
        sm: '0.75rem',
        md: '0.9rem',
        lg: '1rem',
        xl: '1.2rem',
    },

    //line height
    lineHeights: {
        xs: '1.4',
        sm: '1.45',
        md: '1.55',
        lg: '1.6',
        xl: '1.65',
    },

    //headings
    headings: {
        fontWeight: '400',
        sizes: {
            h1: { fontWeight: '500', fontSize: '3rem', lineHeight: '1.5' },
            h2: { fontSize: '2.2rem', lineHeight: '1.5' },
            // ...up to h6
            h6: { fontWeight: '900' },
        },
    },

    //color
    colors: {
        'ocean-blue': [
            '#7AD1DD',
            '#5FCCDB',
            '#44CADC',
            '#2AC9DE',
            '#1AC2D9',
            '#11B7CD',
            '#09ADC3',
            '#0E99AC',
            '#128797',
            '#147885',
        ],
        'bright-pink': [
            '#F0BBDD',
            '#ED9BCF',
            '#EC7CC3',
            '#ED5DB8',
            '#F13EAF',
            '#F71FA7',
            '#FF00A1',
            '#E00890',
            '#C50E82',
            '#AD1374',
        ],
    },
    //theme components
    components: {
        //Button Filter
        ButtonFilter: Button.extend({
            defaultProps: {
                color: 'cyan',
                variant: 'outline',
            },
        }),

        Button: Button.extend({
            styles: {
                root: {
                    borderRadius: '6px',
                },
            },
        }),

        //Pagination
        Pagination: Pagination.extend({
            styles: {
                control: {
                    width: '36px',
                    height: '36px',
                    color: '#212b36',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '50%',
                    borderColor: '#919eab33',
                    accentColor: '#56721b',
                },
            },
        }),

        //Table
        Table: Table.extend({
            styles: {
                tr: {
                    border: 'none',
                },
                td: {
                    borderLeft: 'none',
                    borderRight: 'none',
                },
                th: {
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                },
                tfoot: {
                    width: '100%',
                },
            },
        }),

        //Notification
        Notification: Notification.extend({
            styles: {
                title: {
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                },
                description: {
                    color: '#000000',
                },
            },
        }),

        //Breadcrumbs
        Breadcrumbs: Breadcrumbs.extend({
            styles: {
                breadcrumb: {
                    fontSize: '1rem',
                    textDecoration: 'none',
                },
            },
        }),

        TextInput: TextInput.extend({
            styles: {
                label: {
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: 4,
                },
                input: {
                    height: 48,
                    padding: '0 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '400',
                    border: '1px solid #e9ecee',
                },
                error: {
                    fontSize: '13px',
                    fontWeight: 400,
                },
            },
        }),

        Textarea: Textarea.extend({
            styles: {
                label: {
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: 4,
                },
                input: {
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '400',
                    border: '1px solid #e9ecee',
                },
                error: {
                    fontSize: '13px',
                    fontWeight: 400,
                },
            },
        }),

        PasswordInput: PasswordInput.extend({
            styles: {
                label: {
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: 4,
                },
                input: {
                    height: 48,
                    padding: '0 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '400',
                    border: '1px solid #e9ecee',
                },
                error: {
                    fontSize: '13px',
                    fontWeight: 400,
                },
            },
        }),
        Select: Select.extend({
            styles: {
                label: {
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: 4,
                },
                input: {
                    height: 48,
                    padding: '0 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '400',
                    border: '1px solid #e9ecee',
                },
                error: {
                    fontSize: '13px',
                    fontWeight: 400,
                },
                option: {
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '10px 8px',
                },
                dropdown: {
                    borderRadius: '6px',
                },
            },
        }),

        //Modal
        Modal: Modal.extend({
            styles: {
                content: {
                    padding: '0 16px',
                    borderRadius: '12px',
                },
                header: {
                    padding: '24px 16px 16px 16px',
                },
                body: {
                    padding: '0 16px 24px 16px',
                },
            },
        }),

        // Avatar
        Avatar: Avatar.extend({
            styles: {
                root: { backgroundColor: '#919eab33' },
            },
        }),
    },
});
