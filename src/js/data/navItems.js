export const menuItems = [
    {
      slug: '/',
      title: 'Home',
      component: () => <Home />,
    },
    {
      slug: '/about-us',
      title: 'About Us',
      component: () => <About />,
    },
    {
      slug: '/services',
      title: 'Services',
      component: () => <ProductsServices />,
    },
    {
      slug: '/portfolio',
      title: 'Portfolio',
      component: () => <Portfolio />,
    },
    {
      slug: '/faq',
      title: 'FAQ',
      component: () => <Faq />,
    },
    {
      slug: '/code-of-ethics',
      title: 'Code of Ethics',
      component: () => <CodeEthics />,
    },
    {
      slug: '/contact',
      title: 'Contact',
      component: () => <Contact />,
    },
  ];
  
  export const legalItems = [
    {
      slug: '/privacy',
      title: 'Privacy Policy',
      component: () => <Privacy />,
    },
    {
      slug: '/terms',
      title: 'Terms of Use',
      component: () => <Terms />,
    },
  ]
  
  const hiddenPages = [
    {
      slug: '/style-guide',
      title: 'Style Guide',
      component: () => <StyleGuide />,
    },
  ]
  
  const clientPages = [
    {
      slug: '/wondai-country-festival',
      title: 'Wondai Country Running Festival',
      component: () => <WondaiCountry />,
    },
    {
      slug: '/wondai-country-festival/socialpilot',
      title: 'SocialPilot Instructions - Wondai Country Running Festival',
      component: () => <SocialPilot />,
    },
    {
      slug: '/glenrock-hay',
      title: 'Glenrock Hay',
      component: () => <GlenrockHay />,
    },
  ]
  
  export const routeItems = menuItems.concat(legalItems).concat(hiddenPages).concat(clientPages);