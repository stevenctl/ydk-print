
export function dataFromURL() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const data = params.data;
    if (!data.startsWith('data:')) {
        return '';
    }
    return atob(data
        .split(/:(.+)/)[1]
        .split(/;(.+)/)[1]
        .split(/,(.+)/)[1]);
}



export function parseYDK(text) {
   const lines = text.split('\n');
   const cards = [];
   for (let i in lines) {
       const line = lines[i];
       console.log(line)
       if (line.startsWith('!')) {
           break
       }
       if (isNaN(Number(line))) {
           continue;
       }
       cards.push(line)
   }
   return cards;
}
