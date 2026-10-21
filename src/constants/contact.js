/**
 * Contact and social details of the shop.
 *
 * They are used by the header (top bar with call / facebook / whatsapp) and
 * by the footer (shop locations), so they only have to be changed here.
 */
export const contactInfo = {
  // Sales desk
  phone: "+923259008989",
  phoneDisplay: "+923259008989",
  phoneHref: "tel:+923259008989",

  // Second shop
  phone2: "+923234109037",
  phone2Display: "+923234109037",
  phone2Href: "tel:+923234109037",

  // WhatsApp (the number is written without the + for the wa.me link)
  whatsappNumber: "923259008989",
  whatsappUrl: "https://api.whatsapp.com/send?phone=923259008989",

  // Facebook page of the shop
  facebookUrl: "https://www.facebook.com/laptopsinlahore",

  // Shop locations shown in the footer
  locations: [
    {
      title: "Shop Location",
      address: "LG86-basement hafeez center Gulberg, Lahore, Pakistan",
      phone: "+923259008989",
      phoneHref: "tel:+923259008989",
    },
    {
      title: "Shop Location",
      address: "LG04-basement hafeez center Gulberg, Lahore, Pakistan",
      phone: "+923234109037",
      phoneHref: "tel:+923234109037",
    },
  ],
};
