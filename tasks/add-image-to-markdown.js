const fs = require('fs');
const matter = require('gray-matter');

const dir = './src/data/list/';

async function fetchMetadata(url) {
  const response = await fetch(`https://charming-croissant-c2e47d.netlify.app/.netlify/functions/metadata?url=${url}`);
  
  return response;
}

fs.readdir(dir, (err, files) => {
  files.forEach(async (f) => {
    const path = `${dir}${f}`;

    const file = matter.read(path);

    const parsedFile = matter(file);

    const test = await parsedFile.data['list-item'].map(li => {
      const { url } = li;

      fetchMetadata(url).then((response) => response.json()).then(data => {
        //li.image = data.image;
        console.log(data);
        // fs.writeFile(path, matter.stringify(parsedFile), function(err) {
        // });
      });
    });
 
  });
});