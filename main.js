$(document).ready(function () {
  $(".btn-img").click(function (e) {
    e.preventDefault();
    let id = e.target.id;
    if (id.indexOf("+") !== -1 || id.indexOf("#") !== -1) {
      id = e.target.id + " -";
    } else {
      id = "[" + e.target.id + "]=";
    }
    let text = $("#textoDigitado").html() + id;
    let pgtext = text.replace("<div>", "").replace("</div>", "");
    $("#textoDigitado").html(pgtext);
    verTamanho(text);
  });

  $("input[type=radio]").change(function () {
    var opcaoSelecionada = $("input[name=opcao]:checked").val();
    $("#cabecalho").attr("src", "img/" + opcaoSelecionada + ".png");
    $("#cabecalhoIcon").attr("src", "img/" + opcaoSelecionada + "Icon.png");
  });
});

$("#btnDownload").click(function () {
  const elm = document.querySelector("#divCabec");
  html2canvas(elm).then((canvas) => {
    let divCanvas = document.createElement("div");
    divCanvas.append(canvas);
    document.querySelector("#result").append(divCanvas);

    let a = document.createElement("a");
    let cvs = divCanvas.querySelector("canvas");

    a.href = cvs.toDataURL();
    a.download = "html2canvas.jpeg";
    a.click();

    // remove os elementos adicionados
    divCanvas.remove();
    a.remove();
  });
});

$(".form-upload").change(function (e) {
  PreviewImage(e);
});

//Opções utilizadas para auxilair no preenchimento do texto

$("#testando").click(function () {
  $("#test").attr("type", "text");
});

//tudo que for digitado passa por essa função
$("#textoDigitado").keyup(function () {
  let pgTxt = $("#textoDigitado").html();
  verTamanho(pgTxt);
});

function verTamanho(pgTxt) {
  pgTxtTotal = substituir(pgTxt);
  if (pgTxtTotal != "") {
    pgTxtTotal = pgTxtTotal[0].toUpperCase() + pgTxtTotal.substring(1);
    $("#campoPreenchido").html(pgTxtTotal);
  } else {
    $("#campoPreenchido").html("");
  }
}

function substituir(texto) {
  let txt = texto;

  if (txt.indexOf("[n]") !== -1) {
    txt = textPronto("[n]", txt);
    txt = analisarClick("[n]", txt);
  }

  //varre todas as opções de texto abreviados
  for (let x = 0; x < TextIcon.length; x++) {
    for (let y = 0; y < TextIcon[x].length; y++) {
      let n = "[" + TextIcon[x][y] + "]";
      txt = textPronto(n, txt);
      txt = analisarClick(n, txt);
    }
  }
  return txt;
}

function printText(txt, name, color) {
  if (txt.indexOf(name == -1)) {
    const inputText = txt;
    const startIndex = inputText.indexOf(name);
    const endIndex = inputText.indexOf("-", startIndex);
    if (startIndex !== -1 && endIndex !== -1) {
      const capturedText = inputText.slice(startIndex + name.length, endIndex);
      let result = capturedText;
      txt = txt
        .replace(result, "<b id='" + color + "'>" + result + "</b>")
        .replace(name, "")
        .replace("-", "");
    }
  }
  return txt;
}

//troca mensagem de atalho[] pelo texto pronto com imagem
function textPronto(atalho, txt) {
  if (txt.indexOf(atalho + "=") == -1) {
    txt = printText(txt, "+v ", "red");
    txt = printText(txt, "#V ", "UpRed");
    txt = printText(txt, "+a ", "blue");
    txt = printText(txt, "#A ", "UpBlue");
    return txt;
  } else {
    while (txt.indexOf(atalho + "=") != -1) {
      let td = atalho;
      let pg = txt.indexOf(td);
      let pgTamanho = (td + "=").length;

      let pgNum = txt.slice(pg + pgTamanho, pg + pgTamanho + 1); //pega o numero
      let pgNumT = pgNum;

      //Verifica se foi digitado um número.
      pgNum = justNumbers(pgNum);

      if (pgNum == "") {
        break;
      } else if (pgNum == "**") {
        txt =
          "<b id='UpRed'>Você Inseriu:**" +
          pgNumT +
          "**, Insira Apenas números depois do '=' " +
          td +
          "<b>";
        break;
      }
      txt = returnImg(pgNum, td, txt);
      if (txt.indexOf(td) == -1) {
        break;
      }
    }
    return txt;
  }
}

function justNumbers(text) {
  var numbers = text.replace(/[^0-9]/g, "**");
  return numbers;
}
//retorna o texto com imagem
function returnImg(pgNum, td, txt) {
  let pgTotal = td + "=" + pgNum;
  let pgText = td.replace("[", "");
  pgText = pgText.replace("]", "");
  txt = txt.replace(pgTotal, icoText(pgText));
  txt = txt.replace("**", pgNum);
  return txt;
}

//retorna o texto com icone
function icoText(text) {
  let pgtext;
  if (text == "nV") {
    pgtext = "<b id='UpRed'>**</b>";
  } else if (text == "nA") {
    pgtext = "<b id='blue'>**</b>";
  } else {
    let textArray = TextIcon.find(function (textArray) {
      return textArray[0] === text;
    });
    pgtext = "dentro da aba <b id='blue'>";
    pgtext +=
      textArray[1] +
      "</b>, entre em <b id='UpRed'>**</b>- <img class='img' src='img/";
    pgtext += textArray[2] + "'> <b id='blue'>";
    pgtext += textArray[3] + "</b>";
  }

  return pgtext;
}

//orienta a colocar o numero do "="
function analisarClick(atalho, verificaTexto) {
  if (verificaTexto.indexOf(atalho + "=") != -1) {
    verificaTexto = verificaTexto.replace(atalho + "=", atalho + "=0-9?");
  } else if (verificaTexto.indexOf(atalho) != -1) {
    verificaTexto = verificaTexto.replace(atalho, atalho + "=0-9?");
  }

  return verificaTexto;
}

//chama função quando busca imagem
function PreviewImage(valor) {
  const $ = document.querySelector.bind(document);
  const previewImg = $("#" + valor.target.id + "_img");
  console.log(valor);
  console.log(previewImg);
  const fileToUpload = valor.target.files.item(0);
  const reader = new FileReader();
  reader.onload = (e) => (previewImg.src = e.target.result);
  reader.readAsDataURL(fileToUpload);
}
