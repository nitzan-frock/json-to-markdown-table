# json-to-markdown-table

Ever needed to convert your JSON to a markdown table? well, now you can with the JSON-to-markdown-table!!!!

Just input your data in the form of
```JS
const data = [
	{ someFancyHeader: 'jkdff-g89u2ijknfjsdf', a: 321123, medium: 'so listen up...' },
	{ someFancyHeader: 'kgajhkgd78ohkhb', a: 3, medium: 'here\'s a story about a guy' }
];

const table = generateMarkdownTable(data);
```

and get your output as a nice console-ready string!

```
console.log(table) >>
some fancy_header    | a      | medium                    
-------------------- | ------ | --------------------------
jkdff-g89u2ijknfjsdf | 321123 | so listen up...           
kgajhkgd78ohkhb      | 3      | here's a story about a guy
```
