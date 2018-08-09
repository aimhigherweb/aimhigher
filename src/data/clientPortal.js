import React from 'react';

const clients = {
    'wondai-country-festival': {
        name: 'Wondai Country Running Festival',
        slug: 'wondai-country-festival',
        logoOri: 'portrait',
        domain: 'https://wondaicountryfestival.com.au',
        live: true,
        meta: {
            name: 'Wondai Country Festival | Client Portal',
            description: "Dont go searching through emails, you can find all your information here!",
            slug: '/client/wondai-country-festival',
        },
        theme: {
            colours: {
                primary: {
                    main: "#c1272d",
                    light : {
                        10: "#f9e9ea",
                        25: "#f0c9cb",
                        50: "#e09396",
                        75: "#d15d62",
                        90: "#c73d42",
                    },
                    dark: {
                        10: "#130405",
                        25: "#300a0b",
                        50: "#611417",
                        75: "#911d22",
                        90: "#ae2329",
                    }
                },
                secondary: {
                    main: "#f79321",
                    light : {
                        10: "#fef4e9",
                        25: "#fde4c8",
                        50: "#fbc990",
                        75: "#f9ae59",
                        90: "#f89e37",
                    },
                    dark: {
                        10: "#190f03",
                        25: "#3e2508",
                        50: "#7c4a11",
                        75: "#b96e19",
                        90: "#de841e",
                    }
                },
                neutral: {
                    main: '#000000',
                    light: {
                        10: "#e6e6e6",
                        25: "#bfbfbf",
                        50: "#808080",
                        75: "#404040",
                        90: "#191919"
                    }
                }
                
            },
        },
    },
    'see-me-after': {
        name: 'See Me After',
        slug: 'see-me-after',
        logoOri: 'landscape',
        domain: 'https://seemeafter.com',
        live: false,
        meta: {
            name: 'See Me After | Client Portal',
            description: "Dont go searching through emails, you can find all your information here!",
            slug: '/client/see-me-after',
        },
        theme: {
            colours: {
                primary: {
                    main: '#c10000',
                    light: {
                        90: '#c71919',
                        75: '#d14040',
                        50: '#e08080',
                        25: '#f0bfbf',
                        10: '#f9e6e6',
                    },
                    dark: {
                        90: '#ae0000',
                        75: '#910000',
                        50: '#610000',
                        25: '#300000',
                        10: '#130000',
                    }
                },
                secondary: {
                    main: '#455560',
                    light: {
                        90: '#586670',
                        75: '#748088',
                        50: '#a2aab0',
                        25: '#d1d5d7',
                        10: '#eceeef',
                    },
                    dark: {
                        90: '#3e4d56',
                        75: '#344048',
                        50: '#232b30',
                        25: '#111518',
                        10: '#07090a',
                    }
                },
                neutral: {
                    main: '#000000',
                    light: {
                        90: '#191919',
                        75: '#404040',
                        50: '#808080',
                        25: '#bfbfbf',
                        10: '#e6e6e6',
                    }
                },
            },
            fonts: {
                light: "300 1em 'Hypatia Sans Pro', Arial, sans-serif",
                regular: "400 1em 'Hypatia Sans Pro', Arial, sans-serif",
                bold: "700 1em 'Hypatia Sans Pro', Arial, sans-serif",
                headings: "700 1.5em 'Space Mono', monospace",
            },
        },
    },
    'glenrock-hay': {
        name: 'Glenrock Hay',
        slug: 'glenrock-hay',
        logoOri: 'portrait',
        domain: 'http://glenrockhay.com',
        live: true,
        meta: {
            name: 'Glenrock Hay | Client Portal',
            description: "Dont go searching through emails, you can find all your information here!",
            slug: '/client/glenrock-hay',
        },
        theme: {
            colours: {
                primary: {
                    main: '#005b52',
                    light: {
                        90: '#196b63',
                        75: '#40847d',
                        50: '#80ada9',
                        25: '#bfd6d4',
                        10: '#e6efee',
                    },
                    dark: {
                        90: '#00524a',
                        75: '#00443e',
                        50: '#002e29',
                        25: '#001715',
                        10: '#000908',
                    }
                },
                secondary: {
                    main: '#00ff00',
                    light: {
                        90: '#19ff19',
                        75: '#40ff40',
                        50: '#80ff80',
                        25: '#bfffbf',
                        10: '#e6ffe6',
                    },
                    dark: {
                        90: '#00e600',
                        75: '#00bf00',
                        50: '#008000',
                        25: '#004000',
                        10: '#001a00',
                    }
                },
                neutral: {
                    main: '#000000',
                    light: {
                        90: '#191919',
                        75: '#404040',
                        50: '#808080',
                        25: '#bfbfbf',
                        10: '#e6e6e6',
                    },
                },
            },
        },
    },
    'tech-outsiders': {
        name: 'Tech Outsiders',
        slug: 'tech-outsiders',
        logoOri: 'portrait',
        domain: 'https',
        live: true,
        meta: {
            name: 'Tech Outsiders | Client Portal',
            description: "Dont go searching through emails, you can find all your information here!",
            slug: '/client/tech-outsiders',
        },
        theme: {
            colours: {
                primary: {
                    main: '#b21e6f',
                    light: {
                        10: '#f7e9f1',
                        25: '#ecc7db',
                        50: '#d98fb7',
                        75: '#c55693',
                        90: '#ba347d',
                    },
                    dark: {
                        10: '#12030b',
                        25: '#2d081c',
                        50: '#590f38',
                        75: '#861753',
                        90: '#a01b64',
                    },
                },
                secondary: {
                    main: '#1eb261',
                    light: {
                        10: '#e9f7ef',
                        25: '#c7ecd8',
                        50: '#8fd9b0',
                        75: '#56c589',
                        90: '#34ba71',
                    },
                    dark: {
                        10: '#03120a',
                        25: '#082d18',
                        50: '#0f5931',
                        75: '#178649',
                        90: '#1ba057',
                    },
                },
                neutral: {
                    main: '#000000',
                    light: {
                        10: '#e6e6e6',
                        25: '#bfbfbf',
                        50: '#808080',
                        75: '#404040',
                        90: '#191919',
                    },
                    dark: {
                        10: '#000000',
                        25: '#000000',
                        50: '#000000',
                        75: '#000000',
                        90: '#000000',
                    },
                },
            },
        },
    },
    'janne-martin': {
        name: 'Janne Martin',
        slug: 'janne-martin',
        logoOri: 'portrait',
        domain: 'https://aweddingcelebrant.com.au',
        live: false,
        meta: {
            name: 'Janne Martin | Civil Celebrant',
            description: "Dont go searching through emails, you can find all your information here!",
            slug: '/client/janne-martin',
        },
        theme: {
            colours: {
                primary: {
                    main: '#48318c',
                    light: {
                        90: '#5a4698',
                        75: '#7665a9',
                        50: '#a498c6',
                        25: '#d1cce2',
                        10: '#edeaf4',
                    },
                    dark: {
                        90: '#412c7e',
                        75: '#362569',
                        50: '#241946',
                        25: '#120c23',
                        10: '#07050e',
                    }
                },
                secondary: {
                    main: '#ffcc00',
                    light: {
                        90: '#ffd119',
                        75: '#ffd940',
                        50: '#ffe680',
                        25: '#fff2bf',
                        10: '#fffae6',
                    },
                    dark: {
                        90: '#e6b800',
                        75: '#bf9900',
                        50: '#806600',
                        25: '#403300',
                        10: '#1a1400',
                    }
                },
                neutral: {
                    main: '#333333',
                    light: {
                        90: '#474747',
                        75: '#666666',
                        50: '#999999',
                        25: '#cccccc',
                        10: '#ebebeb',
                    },
                    dark: {
                        90: '#2e2e2e',
                        75: '#262626',
                        50: '#1a1a1a',
                        25: '#0d0d0d',
                        10: '#050505',
                    }
                },
            },
            fonts: {
                regular: "400 1em/1.2 'Muli', Arial, sans-serif",
                bold: "700 1em/1.2 'Muli', Arial, sans-serif",
                headings: "400 1.5em 'Ovo', serif",
            },
        },
    },
    '': {
        name: '',
        slug: '',
        logoOri: 'portrait',
        domain: '',
        live: false,
        meta: {
            name: '',
            description: "Dont go searching through emails, you can find all your information here!",
            slug: '/client/',
        },
        theme: {
            colours: {
                primary: {
                    main: '#',
                    light: {
                        90: '#',
                        75: '#',
                        50: '#',
                        25: '#',
                        10: '#',
                    },
                    dark: {
                        90: '#',
                        75: '#',
                        50: '#',
                        25: '#',
                        10: '#',
                    }
                },
                secondary: {
                    main: '#',
                    light: {
                        90: '#',
                        75: '#',
                        50: '#',
                        25: '#',
                        10: '#',
                    },
                    dark: {
                        90: '#',
                        75: '#',
                        50: '#',
                        25: '#',
                        10: '#',
                    }
                },
                neutral: {
                    main: '#',
                    light: {
                        90: '#',
                        75: '#',
                        50: '#',
                        25: '#',
                        10: '#',
                    },
                    dark: {
                        90: '#',
                        75: '#',
                        50: '#',
                        25: '#',
                        10: '#',
                    }
                },
            },
            fonts: {
                light: "",
                regular: "",
                bold: "",
                headings: "",
            },
        },
    },
};

export default clients;