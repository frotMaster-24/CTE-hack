<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SkipToContent,
	} from "carbon-components-svelte";

    let isSideNavOpen = false;    
</script>

<Header
  persistentHamburgerMenu={true}
  company="CSE"
  platformName=""
  bind:isSideNavOpen
>

<svelte:fragment slot="skip-to-content">
    <SkipToContent />
</svelte:fragment>
  <HeaderNav>
  </HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
  </SideNavItems>
</SideNav>
