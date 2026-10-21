import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { KPay } from "../../src/Payment/Third-Party/KPay.ts";
import { PaymentProcessorAdapter } from "../../src/Structural/Adaptor/PaymentProcessorAdaptor.ts";
import type { PaymentDetails } from "../../src/Types/PaymentInput.ts";
import { details, fakeThirdPartyProcessor } from "../helpers/fakes.ts";

describe("PaymentProcessorAdapter", () => {
  it("forwards pay() to the third-party thirdPartyPay()", async () => {
    const thirdParty = fakeThirdPartyProcessor();

    await new PaymentProcessorAdapter(thirdParty).pay(details);

    assert.deepEqual(
      thirdParty.thirdPartyPay.mock.calls.map((call) => call.arguments),
      [[details]],
    );
  });

  it("works with a real third-party processor", async (t) => {
    const log = t.mock.method(console, "log", () => {});

    await new PaymentProcessorAdapter(new KPay()).pay(details);

    assert.deepEqual(
      log.mock.calls.map((call) => call.arguments),
      [["Processing payment of 25$ from Alice to Bob with KPay third party api..."]],
    );
  });

  it("propagates third-party failures", async () => {
    const thirdParty = {
      thirdPartyPay: mock.fn(async (_input: PaymentDetails) => {
        throw new Error("KPay is unavailable");
      }),
    };

    await assert.rejects(new PaymentProcessorAdapter(thirdParty).pay(details), {
      message: "KPay is unavailable",
    });
  });
});
