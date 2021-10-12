const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_DATASET;

const urlString = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=`;

export async function fetchPage(page) {
  const query = encodeURIComponent(`*[_type == 'page' && slug == '${page}']`);
  const data = await fetch(urlString + query);

  if (data) {
    const json = await data.json();
    return {
      data: json.result,
    };
  } else {
    return { data: { error: "there was an error" } };
  }
}

export async function fetchPageTitles() {
  const query = encodeURIComponent("*[_type == 'page']{title, slug, volgorde}");
  const data = await fetch(urlString + query);
  if (data) {
    const json = await data.json();
    console.log(json);
    const orderedPages = json.result.sort((a, b) => {
      return a.volgorde - b.volgorde;
    });
    return {
      data: orderedPages,
    };
  } else {
    return { data: { error: "there was an error" } };
  }
}

export async function fetchBlogPosts() {
  const query = encodeURIComponent("*[_type == 'exposities']");
  const data = await fetch(urlString + query);
  if (data) {
    const json = await data.json();
    return {
      data: json.result,
    };
  } else {
    return { data: { error: "there was an error" } };
  }
}
