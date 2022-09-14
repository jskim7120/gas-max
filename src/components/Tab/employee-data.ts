import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "opt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swAddr1",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "swAddr2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swBigo",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "areaCode",
      showTooltip: true,
      tooltip: '<span style="color: red;">이름</span>',
    },
    renderer: {
      type: "text",
      showTooltip: true,
    },
  },
  {
    name: "opt",
    fieldName: "opt",
    type: "data",
    width: "150",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "opt",
      showTooltip: false,
    },
  },
  {
    name: "swAddr1",
    fieldName: "swAddr1",
    type: "data",
    width: "220",
    styles: {
      textAlignment: "center",
    },
    header: "swAddr1",
  },
  {
    name: "swAddr2",
    fieldName: "swAddr2",
    type: "data",
    width: "130",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swAddr2",
      showTooltip: false,
    },
    numberFormat: "0",
  },
  {
    name: "swBigo",
    fieldName: "swBigo",
    type: "data",
    width: "300",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swBigo",
      showTooltip: false,
    },
  },
];

// export const rows = [
//   {
//     areaCode: "Kessie",
//     opt: "Vijendra N. Raj",
//     swAddr1: "mus.Donec.dignissim@Praesent.edu",
//     swAddr2: "Arcu Et Pede Incorporated",
//     swBigo: "17",
//   },
//   {
//     areaCode: "Evelyn",
//     opt: "Hridaynath K. Ismail",
//     swAddr1: "fringilla.euismod@elementum.edu",
//     swAddr2: "Aliquam Tincidunt Ltd",
//     swBigo: "28",
//   },
//   {
//     areaCode: "Colleen",
//     opt: "Kanwalkishore C. Khan",
//     swAddr1: "tellus.non.magna@porttitorvulputate.org",
//     swAddr2: "Ultrices Duis Volutpat Institute",
//     swBigo: "38",
//   },
//   {
//     areaCode: "Velma",
//     opt: "Dharani P. Patel",
//     swAddr1: "ipsum@orcilobortisaugue.net",
//     swAddr2: "Posuere Associates",
//     swBigo: "25",
//   },
//   {
//     areaCode: "Fallon",
//     opt: "Preeti M. Singh",
//     swAddr1: "rutrum@orci.com",
//     swAddr2: "Turpis Nec Inc.",
//     swBigo: "46",
//   },
//   {
//     areaCode: "Alexis",
//     opt: "Karnik Y. Patel",
//     swAddr1: "auctor.nunc.nulla@egestas.net",
//     swAddr2: "Massa Quisque Porttitor Industries",
//     swBigo: "34",
//   },
//   {
//     areaCode: "Camille",
//     opt: "Satyamurty A. Singh",
//     swAddr1: "Nunc@blanditenimconsequat.co.uk",
//     swAddr2: "Lorem Lorem Luctus PC",
//     swBigo: "22",
//   },
//   {
//     areaCode: "Aristotle",
//     opt: "Ora C. Rowe",
//     swAddr1: "sed.orci@libero.edu",
//     swAddr2: "Integer Aliquam Corporation",
//     swBigo: 53,
//   },
//   {
//     areaCode: "Anthony",
//     opt: "Alea Bailey",
//     swAddr1: "orci.luctus.et@Cum.ca",
//     swAddr2: "Eros Nam Corp.",
//     swBigo: 58,
//   },
//   {
//     areaCode: "Hakeem",
//     opt: "Kadeem J. Patel",
//     swAddr1: "aliquet.diam.Sed@penatibuset.com",
//     swAddr2: "Ligula Aenean Gravida Consulting",
//     swBigo: 36,
//   },
//   {
//     areaCode: "Raja",
//     opt: "Chloe Valentine",
//     swAddr1: "Cras.dictum@vulputatenisi.ca",
//     swAddr2: "Erat Eget Tincidunt Institute",
//     swBigo: 40,
//   },
//   {
//     areaCode: "Shad",
//     opt: "Zoe P. Boyd",
//     swAddr1: "Sed@semperpretium.edu",
//     swAddr2: "Amet LLP",
//     swBigo: 22,
//   },
//   {
//     areaCode: "Autumn",
//     opt: "Brittany U. Copeland",
//     swAddr1: "sit.amet@interdumSedauctor.co.uk",
//     swAddr2: "Nisi Cum Sociis PC",
//     swBigo: 36,
//   },
// ];
