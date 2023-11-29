const TextIcon = [
  ["solExame", "Exame", "pacientes.png", "Solicitação de Exames/Pacientes"],
  ["painelExame", "Exame", "painelexames.png", "Painel de Exames"],
  ["agenda", "Exame", "agenda.png", "Agendamento"],
  ["ultracap", "Exame", "ultracap.png", " ultracap"],
  ["galeria", "Exame", "galeria.png", "Galeria de imagens"],
  ["dicom", "Exame", "dicom.png", "DICOM"],
  ["digitadores", "Cadastro", "digitadores.png", "Digitadores/Rivisadores"],
  ["convenio", "Cadastro", "convenios.png", "Convênio"],
  ["solicitante", "Cadastro", "solicitantes.png", "Solicitante"],
  ["medicoEx", "Cadastro", "examinadores.png", "Médico Examinador"],
  ["frases", "Cadastro", "frases.png", "Bancos de Frases"],
  ["imagem", "Cadastro", "imagens.png", "Banco de Imagens"],
  ["laudos", "Cadastro", "modelos.png", "Modelos de Laudos"],
  ["relatorio", "Cadastro", "hipoteses.png", "Opiniões de Relatório"],
  ["rascunho", "Cadastro", "modelos.png", "Rascunho"],
  ["esquema", "Cadastro", "esquemas.png", "Esquema Anotômicos"],
  ["protocolo", "Cadastro", "protocolos.png", "Protocolo e Documentos"],
  ["diagnostico", "Cadastro", "tabelas.png", "Dignóstico"],
  ["etiquetas", "Cadastro", "etiquetas.png", "Etiquetas"],
  ["preco", "Financeiro", "precos.png", "Tabela de Preços"],
  ["faturamento", "Financeiro", "faturamento.png", "Relatório de Faturamento"],
  ["recebimento", "Financeiro", "recebimento.png", "Relatório de Recebimento"],
  ["pagar", "Caixa", "contaspagar.png", "Contas a Pagar"],
  ["receber", "Caixa", "contasreceber.png", "Contas a Receber"],
  ["caixa", "Caixa", "caixa.png", "Fluxo de Caixa"],
  ["guias", "Tiss", "tiss.png", " Guias SP/SADT"],
  ["lotes", "Tiss", "tiss.png", "  Lotes TISS"],
  ["tuss", "Tiss", "tuss.png", "TUSS"],
  ["exame", "Diversos", "dia.png", "Exame do Dia"],
  ["configSistem", "Diversos", "configsistema.png", "Configurações do Sistema"],
  ["configRel", "Diversos", "configrelatorio.png", "Configuração dos Exames"],
  ["calculadora", "Tabelas", "calculadoras.png", "Calculadoras"],
  ["cid10", "Tabelas", "cid10.png", "CID-10"],
  ["tabelasEco", "Tabelas", "tabelas.png", "Tabelas Ecográficas"],
  ["procedimentos", "Relatórios", "proced.png", "Procedimentos Realizados"],
  ["pacientesCad", "Relatórios", "listagem.png", "Pacientes Cadastrados"],
  ["aniversariantes", "Relatórios", "aniversariantes.png", "Aniversariantes"],
  ["ultProcedimento", "Relatórios", "ultimos.png", "Ultimos Procedimentos"],
  ["campanha", "Relatórios", "campanha.png", "Campanha"],
  ["usuario", "Segurança", "usuarios.png", "Usuarios"],
  ["acesso", "Segurança", "perfis.png", "Perfil de Acesso"],
  ["logSistema", "Segurança", "log.png", "Log do Sistema"],
  ["registro", "Sobre", "registro.png", "Registro"],
  ["videoAula", "Sobre", "aulas.png", "Video Aulas"],
  ["sobre", "Sobre", "sobre.png", "Sobre ULTRASIS"],
  ["laudo", "Sobre", "sobre.png", "Laudo Técnico"],
  ["versao", "Sobre", "versao.png", "Versão 2.03"],
  ["comp", "Sobre", "versao.png", " Compilação 1.2023.03.17"],
  ["anydesk", "Suporte", "anydesk.png", "AnyDesk"],
  ["teamviewer", "Suporte", "teamviewer.png", "TeamViewer"],
  ["nV", "Atalhos", "0-9.png", "Numeros em Vermelho"],
  ["nA", "Atalhos", "0-9.png", "Numeros em Azul"],
  ["+a", "Atalhos", "a-z2.png", "Texto em Azul"],
  ["#A", "Atalhos", "a-z1.png", "Texto Maiúculo em Azul"],
  ["+v", "Atalhos", "a-z2.png", "Texto em Vermelho"],
  ["#V", "Atalhos", "a-z1.png", "Texto Maiúculo em Vermelho"],
];

function menuPrincipal() {
  let idAtual = TextIcon[0][1];
  iniciar("dp-menu", "ul", "ul", "navTotal", idAtual);
  for (let x = 0; x < TextIcon.length; x++) {
    if (idAtual != TextIcon[x][1]) {
      idAtual = TextIcon[x][1];
      setTag("navTotal", "li", "li", idAtual, idAtual);
      setTag(idAtual, "ul class='Menubar'", "ul", "UL_" + idAtual);
    }
    addText(
      idAtual,
      "btn-img ",
      TextIcon[x][0],
      TextIcon[x][2],
      TextIcon[x][3]
    );
  }
}

//cria os menu
function setTag(va, tp, tpF, id, link = "") {
  if (link) {
    link = "<a href=''>" + link + "</a>";
  }
  $("#" + va).append("<" + tp + " id=" + id + ">" + link + "</" + tpF + ">");
}

//Vai executar uma vez.
function iniciar(va, tp, tpF, id, idAtual) {
  setTag(va, tp + " name=" + id, tpF, id); //navTotal
  setTag(id, "li", "li", idAtual, idAtual);
  setTag(idAtual, "ul class='Menubar'", "ul", "UL_" + idAtual);
}

//Adiciona campo dos menus de cada menu
function addText(idAtual, classe, codInter, img, textView) {
  $("#UL_" + idAtual).append(
    "<li><a href='' class=" +
      classe +
      "id=" +
      codInter +
      "><img src=img/" +
      img +
      ">" +
      textView +
      "</a></li>"
  );
}

menuPrincipal();
