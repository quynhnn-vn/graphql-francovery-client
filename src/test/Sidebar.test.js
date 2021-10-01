const assert = require("assert");

const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

let driver;

const getClassShowNavBtn = async () => {
  try {
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.id("show-nav-btn")).click();
    const className = await driver
      .findElement(By.id("nav-menu"))
      .getAttribute("class");
    return className;
  } finally {
    await driver.quit();
  }
};

const getClassHideNavBtn = async () => {
  try {
    await driver.get("http://localhost:3000/Bretagne");
    await driver.findElement(By.id("show-nav-btn")).click();
    await driver.wait(
      until.elementIsEnabled(driver.findElement(By.id("hide-nav-btn"))),
      5000
    ).click();
    const className = await driver.findElement(By.id("nav-menu")).getAttribute("class");
    return className;
  } finally {
    await driver.quit();
  }
};

const getTextEnterSearch = async () => {
  try {
    await driver.get("http://localhost:3000/");
    await driver
      .findElement(By.id("search-input"))
      .sendKeys("Bretagne", webdriver.Key.ENTER);
    const element = await driver.wait(
      until.elementLocated(By.id("location-name")),
      5000
    );
    const text = await element.getText();
    return text;
  } finally {
    await driver.quit();
  }
};

const getHomePage = async () => {
  try {
    await driver.get("http://localhost:3000/Bretagne");
    await driver.findElement(By.id("home-btn")).click();
    const text = await driver.getCurrentUrl();
    return text;
  } finally {
    await driver.quit();
  }
};

const getRegionsMap = async () => {
  try {
    await driver.get("http://localhost:3000/Bretagne");
    await driver.findElement(By.id("show-nav-btn")).click();
    await driver
      .wait(until.elementLocated(By.id("regions-btn")), 5000)
      .click();
    const text = await driver.getCurrentUrl();
    return text;
  } finally {
    await driver.quit();
  }
};

const getDepartmentsMap = async () => {
  try {
    await driver.get("http://localhost:3000/Bretagne");
    await driver.findElement(By.id("show-nav-btn")).click();
    await driver
      .wait(until.elementLocated(By.id("departments-btn")), 5000)
      .click();
    const text = await driver.getCurrentUrl();
    return text;
  } finally {
    await driver.quit();
  }
};

const getCommunesMap = async () => {
  try {
    await driver.get("http://localhost:3000/Bretagne");
    await driver.findElement(By.id("show-nav-btn")).click();
    await driver
      .wait(until.elementLocated(By.id("communes-btn")), 5000)
      .click();
    const text = await driver.getCurrentUrl();
    return text;
  } finally {
    await driver.quit();
  }
};

describe("Sidebar component : ", () => {
  beforeEach(() => {
    driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .build();
  });

  afterEach(() => {
    driver.quit();
  });

  it("displays when clicking show button- check if class name is active", async () => {
    return getClassShowNavBtn().then((className) => {
      assert.equal(className, "nav-menu active");
    });
  });

  it("hides when clicked hide button - check if class name is none-active", async () => {
    return getClassHideNavBtn().then((className) => {
      assert.equal(className, "nav-menu");
    });
  });

  it("displays location name when entering search form", async () => {
    return getTextEnterSearch().then((text) => {
      assert.equal(text, "BRETAGNE");
    });
  });

  it("displays home page when clicking home button", async () => {
    return getHomePage().then((text) => {
      assert.equal(text, "http://localhost:3000/");
    });
  });

  it("displays regions map when clicking regions button", async () => {
    return getRegionsMap().then((text) => {
      assert.equal(text, "http://localhost:3000/home/regions");
    });
  });

  it("displays departments map when clicking departments button", async () => {
    return getDepartmentsMap().then((text) => {
      assert.equal(text, "http://localhost:3000/home/departements");
    });
  });

  it("displays communes map when clicking communes button", async () => {
    return getCommunesMap().then((text) => {
      assert.equal(text, "http://localhost:3000/home/communes");
    });
  });

});
