/* eslint-disable no-await-in-loop */
const axios = require("axios");

describe("reverse-words", () => {
  const api = axios.create({
    // baseURL: "https://knockknock.readify.net/api"
    baseURL: "http://localhost/.netlify/functions/api"
  });

  const url = "/reversewords";

  const sentence = "hello world";

  it("success", async () => {
    const { data } = await api.request({
      url,
      params: { sentence }
    });
    expect(data).toMatchSnapshot();
    // expect(headers).toMatchSnapshot();
  });

  it("text/json", async () => {
    const { data } = await api.request({
      url,
      params: { sentence }
    });
    expect(data).toMatchSnapshot();
    // expect(headers).toMatchSnapshot();
  });

  it("methods", async done => {
    await Promise.all(
      ["get", "head", "post", "put", "delete", "options", "patch"].map(
        async method => {
          try {
            const { data } = await api.request({
              url,
              params: { sentence },
              method
            });
            expect(data).toMatchSnapshot(method);
          } catch (e) {
            expect(e.response.data).toMatchSnapshot(method);
            expect(e).toMatchSnapshot(method);
          }
        }
      )
    );

    done();
  });

  it("missing param", async () => {
    try {
      const { data } = await api.request({
        url
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      // expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
    expect.hasAssertions();
  });

  it("numbers input", async () => {
    try {
      const { data } = await api.request({
        url,
        params: { sentence: 12345 }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it("symbols input", async () => {
    try {
      const { data } = await api.request({
        url,
        params: { sentence: "@#%@$@#%@#%@#%" }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it("short", async () => {
    try {
      const { data } = await api.request({
        url,
        params: { sentence: "1" }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it("long", async () => {
    try {
      const { data } = await api.request({
        url,
        params: {
          sentence: `Lorem ipsum dolor sit amet, has pericula intellegebat ad, te eripuit pericula his. Ut stet timeam sed. Ut mei alii equidem. Minim audiam mea et, has eu latine saperet intellegam. Sea te debitis probatus, nibh adipiscing mea et, qui eu antiopam periculis accusamus.`
        }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it("paragraphs", async () => {
    try {
      const { data } = await api.request({
        url,
        params: {
          sentence: `Lorem ipsum dolor sit amet, has pericula intellegebat ad, te eripuit pericula his. Ut stet timeam sed. Ut mei alii equidem. Minim audiam mea et, has eu latine saperet intellegam. Sea te debitis probatus, nibh adipiscing mea et, qui eu antiopam periculis accusamus.

          Cu sea vero abhorreant, eu reque principes nam. Vix at veri numquam, reque ubique tritani ius an, veri laboramus duo et. Iusto adversarium ne vel. Fierent rationibus at vel, cum ne expetenda accusamus.

          Te vix tale velit, ne eos quas tritani elaboraret. Ea euripidis dissentias eos, eu veri ullamcorper duo. Eum ne dicta verear legendos. Ne ludus atomorum contentiones usu. Eu pro odio aeterno lucilius, eos ex iusto nominavi pertinacia, natum mnesarchum argumentum et eos.

          Nec wisi labores et, expetenda periculis necessitatibus cum no. Ius te corpora apeirian. Nonumes habemus at mei, sit suavitate complectitur ut. An vim admodum perfecto. Perfecto gubergren posidonium id nec, ea falli tractatos mediocrem vix.

          Ei error corpora omnesque eam. An mel solum cetero eloquentiam, eos ei sumo timeam eleifend. Magna utamur an duo, essent everti utroque an eum. Suavitate adipiscing cum in, et nam ipsum deleniti. Ferri soleat adipiscing ex vis, rebum omnes mentitum pro in.`
        }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it("chinese", async () => {
    try {
      const { data } = await api.request({
        url,
        params: {
          sentence: `教支予提測久歴初過彦守単最築。軽港営訴前手隣聞費予史技在続土載引記首。台目日雑藤表利席学界徳毎必能橋学。舎昇目船歳芸一天行権暮枝装測静械。文米道稲最企同水合事長新俳経全。佐映内内呼主由提秀幕鷹学団置暮投。放推身展高田党一数託偽国。稿論細山撤名人大進浅問金根知属期。務討感果表安子督相年借変西示写誉果今哲関。`
        }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    expect.hasAssertions();
  });

  it("limit?", async done => {
    let i = 0;
    let error;
    let fullSentence = "";

    do {
      try {
        const s = "hello world "; // generate sentence "hello world" * i times
        i += 1;
        fullSentence += s;

        const { data } = await api.request({
          url,
          params: {
            sentence: fullSentence
          }
        });
        expect(data).toMatchSnapshot(`${i}`);
      } catch (e) {
        error = e;
      }
    } while (!error);

    expect(`loop stops at ${fullSentence.length}`).toMatchSnapshot();
    expect(error).toMatchSnapshot();
    expect(error.response.data).toMatchSnapshot();
    expect.hasAssertions();

    done();
  }, 1000000);
});
