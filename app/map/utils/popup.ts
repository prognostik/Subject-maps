export function escape(text) {
  text = text.replace(/'/g, "\\'");
  text = text.replace('"', '\"');

  return text;
}

/** Escape the beginning of code blocks so that Prism can work */
export function escapeCode(text) {
  console.log("Escape code: ", text);

  let arr = text.split(/(<code>|<\/code>|<code class="[\w-]+">)/);

  //console.log("Splitting text: ", arr);

  arr.forEach((item, i) => {
    //console.log("Item: " + item);

    if (/<code/.test(item)) {
      let code = arr[i+1];

      //console.log(code);

      // see Prism docs
      code = code.replace(/[<]/g, "&lt;");
      //code = code.replace(/[&]/g, "&amp;");

      arr[i+1] = code;
    }
  });

  text = arr.join("");

  //console.log(text);

  return text;
}

export function unescapeCode(text) {
  text = text.replace(/&lt;/g, "<");

  return text;
}

// export function addUrl(text) {
//   //const pattern = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/;
//   const pattern = /(^https?:\/\/[^\s$.?#].[^\s]*$)/;

//   const arr = text.match(pattern);

//   if (arr.length > 0) {
//     arr.forEach(item => {

//     });
//   }

//   text = text.replace(pattern, '<a href="$1" target="_blank">$1</a>')

//   return text;
// }

export function addUrl(text) {
  // TODO: doesn't match urls starting from www
  const pattern = /https?:\/\/[^\s$.?#].[^\s]*/g;

  const arr = text.match(pattern);

  if (arr && arr.length > 0) {
    arr.forEach(item => {
      text = text.replace(item, `<a href="${item}" target="_blank">${item}</a>`);
    });
  }

  return text;
}

export function removeUrl(text) {
  //const pattern = /<a href="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)" target="_blank">/;
  const pattern = /<a href="https?:\/\/[^\s$.?#].[^\s]*" target="_blank">/g;
  const pattern2 = /<\/a>/g;

  text = text.replace(pattern, "");
  text = text.replace(pattern2, "");

  return text;
}

export function wrapCode(textarea, type) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const selection = textarea.value.substring(start, end);
  let newtext;

  switch(type) {
    case "code-big":
      newtext = '<pre><code class="language-jsx">' + selection + '</code></pre>';
      break;
    case "code-small":
      newtext = '<code class="language-jsx">' + selection + '</code>';
      break;
    case "b":
      newtext = '<b>' + selection + '</b>';
      break;
    case "concept":
      newtext = '<span class="concept-border">' + selection + '</span>';
      break;
    case "table":
      newtext = '<div class="table">' + selection + '</div>';
      break;
    case "table-column":
      newtext = '<div class="table-column">' + selection + '</div>';
      break;
    case "table-row":
      newtext = '<div class="table-row">' + selection + '</div>';
      break;
    case "code-simple":
      newtext = '<code>' + selection + '</code>';
      break;                                     
  }

  console.log("Wrapped text: ", newtext);

  textarea.setRangeText(newtext, start, end);
}

export function decapitalize(text) {
  const arr = text.split(" ");

  console.log("Decapitalizing");

  arr.forEach((word, i) => {
    if (i !== 0) {
      arr[i] = word.toLowerCase();
    }
  });

  text = arr.join(" ");

  return text;
}