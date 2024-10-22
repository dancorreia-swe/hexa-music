import "tsarch/dist/jest";

import { filesOfProject } from "tsarch";

describe("architecture", () => {
  // architecture tests can take a while to finish
  jest.setTimeout(60000);

  // we use async await in combination with jest since this project uses asynchronous calls
  it("business logic should not depend on the ui", async () => {
    const rule = filesOfProject()
      .inFolder("contexts/albums/domain")
      .shouldNot()
      .dependOnFiles()
      .inFolder("contexts/albums/application");

    await expect(rule).toPassAsync();
  });

  it.skip("business logic should be cycle free", async () => {
    const rule = filesOfProject()
      .inFolder("business")
      .should()
      .beFreeOfCycles();

    await expect(rule).toPassAsync();
  });
});
