const MenuHelper = {
  toggleMenu: (element) => {
    if (window.innerWidth <= 768) {
      element.sideMenuElement.classList.toggle('showMenu')
    } else {
      element.sideMenuElement.classList.remove('showMenu')
      element.sideMenuElement.classList.toggle('hideMenu')
    }
  },
  closeMenu: (element) => {
    element.sideMenuElement.classList.remove('showMenu')
  }
}

export default MenuHelper
