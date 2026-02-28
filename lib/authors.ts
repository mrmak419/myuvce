// lib/authors.ts

export interface Author {
  id: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  link: string;
}

export const AUTHORS: Record<string, Author> = {
  ayaan: {
    id: "ayaan",
    name: "Mohammad Ayaan Khan",
    role: "CSE '29 • Lead-Dev & Maintainer",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWqww6gBq6LDkcyWWVG2X5_kdocx4iJMv5xHaw19IVQYG_8D8KDPEn1iUzesdlLRkhlA6qJ25iSdI1lEQGbPtfYmmA9_EZgG1mURzP5CwlIe7abEz05Z_zoTFAeP9T318htde3bJnpb-I3tNb2dd2qYoCOCi8ZGQKc9ighQCBQuIhV7ah76Q7bnmKw2QOM/s320-rw/ayaan.png",
    bio: "Leads the technical development of the platform. He combines code with design to turn campus data into interactive and engaging stories.",
    link: "https://www.linkedin.com/in/mrmak/"
  },
  gourav: {
    id: "gourav",
    name: "Gourav P D",
    role: "CSE '29 • Strategy & Tech Support",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtAhN4DRm9FRIY4N7sIwrUMsLtL6Otz0lu-9j-smOs2YADTZt4IWo3p7S4i570QNFhxj-XGOr4EFUYPbu_FjxYTIpkUCI6hh_30C3TuOARlYVz0b_eUAbQ2aKPaF2r6j3IPElNA1_obRhOj68M4qkn3B6QzhQbX8FiM4-mZi4ZTBsxdvuURNeCjUH7B3qs/s320-rw/gourav.png",
    bio: "Manages digital presence and ad-hoc development, ensuring our strategy stays practical and effective.",
    link: "https://www.linkedin.com/in/gourav-pd-631526385/"
  },
  chinmay: {
    id: "chinmay",
    name: "Chinmay Joshi",
    role: "CSE '29 • Author",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmO4qkXOzdCoy52gGsCfFspSWIvQCfWtK5hihyphenhyphenjN6t_YOorI-CTrG78TtWwDHkfYly5NWGloAqvvyBhXCWBAp4qyVUuSho2gB4D12LFDWMR4SUy0lA9sqAh2AwBZh60LBk0D7wciv1pP-gQvVGI1YlpJDgOPopvPrxJQrNJh-DZiSXFe5XlAePIR6QJoTY/s96-rw/chinmay.jpg",
    bio: "The voice of the community. He bridges the gap between seniors and freshers through mentorship articles.",
    link: "https://www.linkedin.com/in/chinmay-joshi-35a354379/"
  },
  shreyas: {
    id: "shreyas",
    name: "Shreyas V",
    role: "ISE '29 • Web Developer & Author",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6pCAX4l73rNz33SY6XIfQAvf0zYolmlv2t7roGrNqT7kqVPVEBQcVC-UQncmKjljrWtkmEkqXDLvcT6Tpy1v0hxDxi1jNlssWm98_PNG3KT83LC1akmpEoslRTGgzyxKrfesJLsWXwkM-TxJHbCP600B_9AqHTTHwL0nUq9opiLbH77aM2M55avrAN4qw/s320-rw/shreyas.jpg",
    bio: "Developed UVCE Learn & Co-developer of the upcoming 'Student Hub'. He is building digital utilities, including the class attendance tracker, to modernize campus operations.",
    link: "https://www.linkedin.com/in/ishreyasv/"
  },
  pavitra: {
    id: "pavitra",
    name: "K S Pavitra",
    role: "CSE '29 • Guest Author",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlECbgEsaD7gmHarvzAbQ6Ue6wt7_P50hQi5WhF7DZIV9h6zt_hFDzc-MUuO1uUimvm8r49TaGHiFHhSHofWgjKdNkv21jmZ-T-ZoZAiPLCmpGa81LVXdYtckeQkhsdw-8Vw0O5k0PmIGrVwCVv0Fs5-R8MS22IChmI4_2keEkY1CNlACPb8ewDnhy5XCL/s400/1763832591989.jpg",
    bio: "An insightful writer focused on student welfare. She specializes in creating comprehensive guides for student accommodation and campus resources, helping fellow UVCEians transition smoothly into college life.",
    link: "https://www.linkedin.com/in/k-s-pavitra-048a81384/"
  }
};