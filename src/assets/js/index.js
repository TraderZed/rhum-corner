class CocktailBar {
  constructor() {}
  getContent(type, isCocktail) {
    $.ajax({
      type: "GET",
      url: `https://the-black-hoof.firebaseio.com/rhum_corner-${type}.json`,
      success: data => {
        type === 'hours' ? this.buildHours(data) : this.buildMenu(type, data, isCocktail);
      }
    });
  }
  buildHours(data) {
    const $hoursTable = $(".hoof-info-hours");
    for (const val of data) {
      $hoursTable.append(`<tr><td>${val.day}</td><td>${val.hours}</td></tr>`);
    };

  }
  buildMenu(type, data, isCocktail) {
    const $menuList = $(`.cocktail-bar-menu__${type}`).find(".cocktail-bar-menu__list");
    for (const val of data) {
      $menuList.append(
        `<li class='cocktail-bar-menu__list-item'><span class="cocktail-bar-menu__list-item-name">${
          val.name
        }${
          isCocktail ? `<span>${val.description}</span>` : ""
        }</span><span class="cocktail-bar-menu__list-item-price">${
          val.price
        }</span></li>`
      );
    }
  }
}

const cocktailBar = new CocktailBar();

cocktailBar.getContent("hours");
cocktailBar.getContent("snacks");
cocktailBar.getContent("plates");

cocktailBar.getContent("drinks", true);
