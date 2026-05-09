/**
 * Script corrigido para gerar um novo arquivo XLSX com base nas informações extraídas do PDF
 * de programação mais recente.
 */

import ExcelJS from 'exceljs';
import { writeFileSync } from 'fs';

// Dados extraídos e formatados do PDF mais recente
const dadosProgramacao = {
  programacao: [
    // Dia 1 - 18 de maio
    ['18/05 Seg', 'Anfiteatro', '8:00', '', 'Abertura', '', 'Chegada e boas vindas Credenciamento e café', '', ''],
    ['18/05 Seg', 'Anfiteatro', '9:00', '9:30', 'Mesa', 'Abertura', 'Mesa de Abertura Organização etc (30 min)', 'Flynn', 'Eduardo me informou hoje que talvez não consiga estar presente. Estou vendo com ele outro bancário (MHonda)'],
    ['18/05 Seg', 'Anfiteatro', '9:30', '10:30', 'Mesa', '1', 'Mesa 1– Cenário atual da Soberania Digital no Brasil', 'Flynn', ''],
    ['18/05 Seg', 'Anfiteatro', '10:30', '11:00', 'Palestra', '', 'Caminhos da soberania Digital no Brasil -Zé Dirceu - Ex Ministro da Casa Civil do Brasil - CONFIRMADO', '', 'Coffe break rolando sigilosamente'],
    ['18/05 Seg', 'Anfiteatro', '11:05', '12:30', 'Mesa', '2', 'Mesa 2: Movimentos sociais em luta pela soberania digital', 'Nati B', '10 min de intervenção para cada movimento + 40 min de debate'],
    ['18/05 Seg', 'Anfiteatro', '12:30', '14:00', 'Intervalo', '', 'ALMOÇO', '', ''],
    ['18/05 Seg', 'Anfiteatro', '14:00', '15:25', 'Mesa', '3', 'Mesa 3: Soberania digital desde o sul: condição para o desenvolvimento econômico, político e social.', 'Tica Moreno', ''],
    ['18/05 Seg', 'Anfiteatro', '15:30', '16:30', 'Mesa', '4', 'Mesa 4 - Regulação da Internet no Brasil e soberania digital: de Redes Sociais, algorítimos, econômica', 'Paulo Rená/Ale Arns', ''],
    ['18/05 Seg', 'Anfiteatro', '16:30', '17:30', 'Mesa', '5', 'Mesa 5: Infraestrutura, chips, e "nuvem" soberanos e livres', 'Lari G', '1) Datacenters soberanos com software livre - C3SL Marco Sunye - CONFIRMADO\n2) Indústria de Hardware brasileiro diante das Big Techs - Manoel Fonseca Neto - CEO da OMTX – CONFIRMADO\n3) Olival Freire, presidente do CNPq – a confirmar\n4) Fábrica de chips brasileira - Laisa Caroline Costa De Biase – LSI – USP - CAIU\n5) Solução de "nuvem" soberana – DARRABI não pode, desconfirmou, Convidado Valdir Paixao - CAIU'],
    ['18/05 Seg', 'Anfiteatro', '17:30', '17:50', 'Intervalo', '', 'Coffee break – 20 mn MÚSICA', '', ''],
    ['18/05 Seg', 'Anfiteatro', '17:50', '20:15', 'Mesa', '6', 'Mesa 6: Propostas Emergenciais para a Soberania Digital do Brasil -Quais os passos para a construção de nossa Soberania Digital?', 'Flynn', ''],
    ['18/05 Seg', 'Anfiteatro', '20:15', '', 'Especial', '', 'Proposta de Encontro com o Presidente da República do Brasil', '', 'A CONFIRMAR'],
    ['18/05 Seg', 'Anfiteatro', '20:30', '', 'Especial', '', 'Encontro', '', ''],

    // Dia 2 - 19 de maio - Anfiteatro
    ['19/05 Ter', 'Anfiteatro', '8:30', '', 'Abertura', '', 'Chegada e boas vindas', '', ''],
    ['19/05 Ter', 'Anfiteatro', '9:00', '10:30', 'Mesa', '7', 'Mesa 7 - O que é Soberania Digital e o que o Software livre tem a ver com isso?', 'Wladimir Alquimídia', 'Skárnio não poderá vir e passou a mediação para Wladimir do Alquimídia'],
    ['19/05 Ter', 'Anfiteatro', '10:35', '12:00', 'Mesa', '8', 'Mesa 8 - Soberania Digital no contexto das Universidades', 'Leozenha', 'Aguardando o retorno do Andes'],
    ['19/05 Ter', 'Anfiteatro', '12:00', '13:30', 'Intervalo', '', 'Almoço MÚSICA', '', ''],
    ['19/05 Ter', 'Anfiteatro', '13:30', '14:40', 'Mesa', '9', 'Mesa 9 - Datacenters da Sociedade Civil organizada e suas possibilidades e lutas.', 'Flynn', ''],
    ['19/05 Ter', 'Anfiteatro', '14:40', '16:00', 'Mesa', '10', 'Mesa 10 - Soberania Digital na sociedade civil organizada – Soluções de movimentos e soluções livres de software, hardware e processos.', 'Flynn', ''],
    ['19/05 Ter', 'Anfiteatro', '16:00', '16:20', 'Intervalo', '', 'Coffee break', '', ''],
    ['19/05 Ter', 'Anfiteatro', '16:20', '17:30', 'Mesa', '11', 'Mesa 11 - Web Social Aberta - Redes Sociais Livres e Federadas como alternativas às plataformas das Big Techs.', 'Wladimir - Alquimídia', ''],
    ['19/05 Ter', 'Anfiteatro', '17:30', '19:00', 'Mesa', '12', 'Mesa 12 - Sindical - Construção de alinhamento da classe trabalhadora', '', ''],
    ['19/05 Ter', 'Anfiteatro', '19:00', '20:00', 'Especial', '', 'Frente Parlamental e Plano Nacional de Soberania Digital', '', 'A CONFIRMAR'],

    // Dia 2 - 19 de maio - Auditório 1 (60 lugares)
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '8:30', '', 'Abertura', '', 'Chegada e boas vindas', '', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '9:00', '10:30', 'Mesa', '13', 'Mesa 13 – Soberania digital nas Eleições: a partir das novas regras do TSE para propaganda eleitoral online, como assegurar a soberania digital?', 'Paulo Rená', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '10:35', '12:00', 'Mesa', '14', 'Mesa 14 – A quem pertence o prontuário? Diálogos sobre soberania digital e sanitária frente a mercantilização da vida.', 'Lucas da Costa Brandão', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '12:00', '13:30', 'Intervalo', '', 'ALMOÇO', '', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '13:30', '15:00', 'Mesa', '15', 'Mesa 15– Soberania Digital e Inteligência Artificial', 'Márcia Honda', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15:00', '16:00', 'Mesa', '16', 'MESA 16 - Lançamento do Índice de Soberania Digital (Digital Sovereignty Index – DSI) do BRICS', 'Isa Rocha', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '16:00', '16:20', 'Intervalo', '', 'Coffee Break', '', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '16:30', '17:30', 'Mesa', '19', 'Mesa 19 - Lançamento documentário: "Quem tá tomando conta desse espaço?"', 'Alexandre Arns Gonzales e Paulo Rená', 'Descrição: apresentação do documentário de aproximadamente 20 minutos sobre a luta pela regulação de plataformas digitais no Brasil seguido de uma roda de conversa sobre o tema'],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18:00', '19:00', 'Mesa', '18', 'Mesa 18 – Curta Juris Máquina', 'Paulo Rená', 'Tainá Junquilho (Diretora do Curta), Ana Farranha (UnB), Rosane Cordeiro (Sindados – MG), Eduardo Marcelino (GYO) - CONFIRMADO'],

    // Dia 2 - 19 de maio - Auditório 2 (60 lugares - sem internet)
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '7:30', '9:00', 'Roda de conversa', 'RC1', 'Roda de conversa/Plenária? 1 - Pensando futuros – Os caminhos da luta da Rede Nacional de Soberania DIgital: como organizar? Quais as lutas principais?', 'Flynn', 'Verificar se precisa colocar na programação.'],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '9:30', '10:45', 'Roda de Conversa', 'RC2', 'Roda de Conversa / Letramento Soberano + Frente Parlamental', 'Uirá / Marcia Honda', ''],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '10:45', '12:00', 'Intervalo', '', 'Intervalo', '', ''],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '12:00', '13:30', 'Intervalo', '', 'ALMOÇO', '', ''],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '13:30', '15:00', 'Roda de conversa', 'RC3', 'Roda de conversa 1 – EDUCAÇÃO E SOBERANIA DIGITAL Como organizar os debates de soberania digital na Educação? Quais os próximos passos? Como se organizar? COMBATER A PLATAFORMIZAÇÃO DA EDUCAÇÃO', '', 'a CONFIRMAR'],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '15:30', '16:00', 'Roda de conversa', 'RC4', 'Roda de conversa 2- Qual a pilha de software livre para a sociedade civil? Do sistema operacional à nuvem. O que usar e indicar?', '', 'a CONFIRMAR'],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '16:00', '16:30', 'Intervalo', '', 'Coffee Break', '', ''],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '16:30', '17:30', 'Mesa', '17', 'MESA 17 - Lançamento livro Teia -Henrique Interlig', 'Henrique Interlig', 'Convidado: Sérgio Amadeu'],
    
    // Sala de Reuniões VIP
    ['19/05 Ter', 'Sala de Reuniões VIP', '8:00', '10:00', 'Especial', '', 'Reservado para RESF e outras iniciativas, discussão de uma nova IA', '', 'NÃO COLOCAR NA PROGRAMAÇÃO OFICIAL'],
    ['19/05 Ter', 'Sala de Reuniões VIP', '10:30', '12:00', 'Roda de Conversa', 'RC5', 'Roda de Conversa 3: Por que a soberania digital precisa da economia solidária e feminista e do software livre?', 'Nati e Everton', '']
  ],
  
  palestrantes: [
    // Mesa de Abertura
    ['18/05 Seg', 'Anfiteatro', 'Abertura', 'Presidente dos Bancários DF', 'Bancários DF', 'Palestrante', 'A CONFIRMAR', 'Eduardo Araújo - Talvez não consiga estar presente'],
    ['18/05 Seg', 'Anfiteatro', 'Abertura', 'Marcia Honda', 'Fenadados', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', 'Abertura', 'Alexandre Arns González', 'Campanha Internet Legal', 'Palestrante', 'A CONFIRMAR', ''],
    ['18/05 Seg', 'Anfiteatro', 'Abertura', 'Beá', 'Rede pela Soberania', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', 'Abertura', 'Renata Miele ou Bia Barbosa', 'CGI', 'Palestrante', 'A CONFIRMAR', 'Duas opções de nome'],
    ['18/05 Seg', 'Anfiteatro', 'Abertura', 'Flynn', 'Organização', 'Responsável', '—', ''],

    // Mesa 1 - Cenário atual da Soberania Digital no Brasil
    ['18/05 Seg', 'Anfiteatro', '1', 'João Cassino', '—', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '1', 'Julia Santa Anna Mello', 'Aqualtune Lab', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '1', 'Sérgio Amadeu da Silveira', 'UFABC', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '1', 'Márcia Barbosa', 'Reitora UFRGS', 'Palestrante', 'A CONFIRMAR', 'Convite feito'],

    // Mesa 2 - Movimentos sociais em luta pela soberania digital
    ['18/05 Seg', 'Anfiteatro', '2', 'Natalia Blanco', 'Marcha Mundial das Mulheres', 'Responsável / Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '2', 'Raul Amorim', 'MST', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '2', 'Felipe Bonel', 'MTST', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '2', 'Bruna Camilo', 'Marcha Mundial de Mulheres', 'Palestrante', 'CONFIRMADA', ''],
    ['18/05 Seg', 'Anfiteatro', '2', 'Bárbara Coelho', 'APUB UFBA', 'Palestrante', 'CONFIRMADA', 'Precisa de passagem'],

    // Mesa 3 - Soberania digital desde o sul
    ['18/05 Seg', 'Anfiteatro', '3', 'Fiorella Haim', 'Consejo de Dirección de Ceibal – Uruguay', 'Palestrante', 'CONFIRMADA', ''],
    ['18/05 Seg', 'Anfiteatro', '3', 'Jeff Xiong', 'East China Normal University, Institute of International Communication Shanghai, China', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '3', 'Isadora Rocha', 'Fórum Tecnológico dos BRICS', 'Palestrante', 'CONFIRMADA', ''],
    ['18/05 Seg', 'Anfiteatro', '3', 'Tica Moreno', '—', 'Responsável', 'A CONFIRMAR', ''],

    // Mesa 4 - Regulação da Internet no Brasil
    ['18/05 Seg', 'Anfiteatro', '4', 'Helena Martins', 'DiraCom/CDR', 'Palestrante', 'CONFIRMADA', ''],
    ['18/05 Seg', 'Anfiteatro', '4', 'André Boselli', 'Artigo 19', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '4', 'Paulo Rená', 'IRIS', 'Palestrante', 'CONFIRMADO', ''],
    
    // Mesa 5 - Infraestrutura, chips, e "nuvem" soberanos
    ['18/05 Seg', 'Anfiteatro', '5', 'Marco Sunye', 'C3SL', 'Palestrante', 'CONFIRMADO', 'Datacenters soberanos com software livre'],
    ['18/05 Seg', 'Anfiteatro', '5', 'Manoel Fonseca Neto', 'CEO da OMTX', 'Palestrante', 'CONFIRMADO', 'Indústria de Hardware brasileiro diante das Big Techs'],
    ['18/05 Seg', 'Anfiteatro', '5', 'Olival Freire', 'CNPq', 'Palestrante', 'A CONFIRMAR', 'Presidente do CNPq'],
    ['18/05 Seg', 'Anfiteatro', '5', 'Laisa Caroline Costa De Biase', 'LSI – USP', 'Palestrante', 'CAIU', 'Fábrica de chips brasileira - CAIU'],
    ['18/05 Seg', 'Anfiteatro', '5', 'DARRABI', '—', 'Palestrante', 'CAIU', 'Solução de "nuvem" soberana - desconfirmou'],
    ['18/05 Seg', 'Anfiteatro', '5', 'Valdir Paixao', '—', 'Palestrante', 'CAIU', 'Convidado substituto - CAIU'],

    // Mesa 6 - Propostas Emergenciais para a Soberania Digital do Brasil
    ['18/05 Seg', 'Anfiteatro', '6', 'Sérgio Amadeu', 'UFABC', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'Beatriz Tibiriçá', 'Rede Nacional de Soberania Digital', 'Palestrante', 'CONFIRMADA', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'TC Silva', 'Rede Mocambos', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'Tica Moreno', 'Marcha Mundial de Mulheres', 'Palestrante', 'CONFIRMADA', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'José Vital', 'Frente por IA com Direitos Sociais', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'Stédile', 'MST', 'Palestrante', '???', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'José Murilo de Carvalho', 'WebSocialBR/IBRAM', 'Palestrante', 'CONFIRMADO', ''],
    ['18/05 Seg', 'Anfiteatro', '6', 'Flynn', 'Organização', 'Mediação', '—', ''],

    // Mesa 7 - O que é Soberania Digital e o que o Software livre tem a ver com isso?
    ['19/05 Ter', 'Anfiteatro', '7', 'Corinto', '—', 'Palestrante', 'A CONFIRMAR', ''],
    ['19/05 Ter', 'Anfiteatro', '7', 'Marcelo Branco', 'Software Livre', 'Palestrante', 'A CONFIRMAR', ''],
    ['19/05 Ter', 'Anfiteatro', '7', 'Coe1ho', 'Coletivo Farpa e Movimento Software Livre', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '7', 'John Maddog Hall', '—', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '7', 'Rafael', '—', 'Palestrante', 'CONFIRMADO', 'Empresa patrocinadora do Maddog com stand'],
    ['19/05 Ter', 'Anfiteatro', '7', 'Wladimir', 'Alquimídia', 'Mediação', 'CONFIRMADO', 'Skárnio passou mediação para Wladimir'],

    // Mesa 8 - Soberania Digital no contexto das Universidades
    ['19/05 Ter', 'Anfiteatro', '8', 'Marcos Sunyê', 'Reitor UFPR', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '8', 'ka.Menezes', 'UFBA - Raul Hacker Club', 'Palestrante', 'CONFIRMADA', ''],
    ['19/05 Ter', 'Anfiteatro', '8', 'Leticia Cesarino', 'UFSC', 'Palestrante', 'CONFIRMADA', ''],
    ['19/05 Ter', 'Anfiteatro', '8', 'Priscila Gonzales', 'UnB', 'Palestrante', 'CONFIRMADA', 'Participação online - educação vigiada'],
    ['19/05 Ter', 'Anfiteatro', '8', 'Leonardo Zenha', 'UFPA', 'Mediação', 'CONFIRMADO', ''],
    
    // Mesa 9 - Datacenters da Sociedade Civil organizada
    ['19/05 Ter', 'Anfiteatro', '9', 'Junior Paixão', 'DCCL - Rede Mocambos', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '9', 'Moacir Neto', 'NUPEF', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '9', 'Marco Mendes', 'PopSolutions', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '9', 'Mauro Salles', 'Datacenter dos Bancários -RS', 'Palestrante', 'A CONFIRMAR', ''],
    
    // Mesa 10 - Soberania Digital na sociedade civil organizada
    ['19/05 Ter', 'Anfiteatro', '10', 'Rosemary Segurado', 'Coletivo Digital', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '10', 'Vince Tozzi', 'Rede Mocambos- Baobáxia, TV Tainã', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '10', 'Jader Gama', 'Plantaformas', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '10', 'Lívia Ascava', 'HackLab', 'Palestrante', 'CONFIRMADA?', ''],
    ['19/05 Ter', 'Anfiteatro', '10', 'Maraiza', 'MariaLab', 'Palestrante', 'A CONFIRMAR', ''],
    ['19/05 Ter', 'Anfiteatro', '10', 'Éverton Ribeiro', 'Economia solidária digital (RESF)', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '10', 'Alexandre Zago Boava', 'MTST', 'Palestrante', 'CONFIRMADO', ''],
    
    // Mesa 11 - Web Social Aberta
    ['19/05 Ter', 'Anfiteatro', '11', 'José Murilo Jr', 'Instituto Brasileiro de Museus', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '11', 'Wladimir', 'Alquimídia', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '11', 'Guilherme Flynn Paciornik', 'Onda.Social', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '11', 'Biana F', 'Orgânica', 'Palestrante', 'CONFIRMADA', ''],
    ['19/05 Ter', 'Anfiteatro', '11', 'Ursal', '—', 'Palestrante', 'Aguarando indicação de nome', ''],
    
    // Mesa 12 - Sindical
    ['19/05 Ter', 'Anfiteatro', '12', 'FONASEFE (Servidores Federais)', 'Servidores Federais', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '12', 'SindiReceita', 'FONASEFE', 'Palestrante', 'Aguardando', 'Willians Monjardim'],
    ['19/05 Ter', 'Anfiteatro', '12', 'FENASPS', '—', 'Palestrante', 'Aguardando', 'Moacir Lopes'],
    ['19/05 Ter', 'Anfiteatro', '12', 'Stela Almeida', 'Sindados BA', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '12', 'Reinaldo Soares', 'Sindpd-PE', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '12', 'Jonsué Martins', 'Sindpd-PR', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '12', 'Crispim', 'Sindpd-RJ', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Anfiteatro', '12', 'Eduardo Araújo', 'Bancários-DF', 'Palestrante', 'Aguardando', ''],
    ['19/05 Ter', 'Anfiteatro', '12', 'Marcia Honda', 'Fenadados', 'Mediação', 'CONFIRMADO', ''],
    
    // Mesa 13 - Soberania digital nas Eleições
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '13', 'Letícia Cesarino', '—', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '13', 'Jader Gam', 'LIANE', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '13', 'Rafaela Ferreira', 'IRIS', 'Palestrante', 'Aguarando confirmação', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '13', 'Mateus Mendes', 'REBRIP', 'Palestrante', 'Convidado', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '13', 'Luis Felipe', 'A19', 'Palestrante', 'A CONFIRMAR', ''],
    
    // Mesa 14 - A quem pertence o prontuário?
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '14', 'Raquel Rachid', 'USP e Fórum Popular Paulista de Saúde', 'Palestrante', 'CONFIRMADA PRESENCIAL', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '14', 'Adriana Macedo Marques', 'Ministério da Saúde', 'Palestrante', 'CONFIRMADA PRESENCIAL', 'Encarregada de Dados Pessoais'],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '14', 'Uirá Porã', 'Felicilab', 'Palestrante', 'CONFIRMADO PRESENCIAL', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '14', 'Nésio Fernandes', 'Médico sanitarista', 'Palestrante', 'CONFIRMADO ONLINE', 'Militante do movimento software livre'],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '14', 'Lucas da Costa Brandão', 'UERJ e Campanha Internet Legal', 'Coordenação', 'CONFIRMADO', ''],
    
    // Mesa 15 - Soberania Digital e Inteligência Artificial
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Natália Lobo', 'IARA (MST/MMM)', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'José Vital', 'Frente IA com Direitos Sociais', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Valdir Bueira', 'Oficiais de justiça do RS', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Lucas Brandão', 'ELA-IA', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Observatório de IA – Contraf', 'Bancários MG', 'Palestrante', 'Aguarando confirmar', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Greg', 'CNDH', 'Palestrante', 'A CONFIRMAR', 'IA com DH'],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Oráculo ICL', '—', 'Palestrante', '???', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '15', 'Márcia Honda', '—', 'Responsável', 'CONFIRMADO', ''],
    
    // Mesa 16 - Lançamento do Índice de Soberania Digital (DSI) do BRICS
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '16', 'Isa Rocha', 'Fórum Tecnológico dos BRICS', 'Responsável', 'CONFIRMADO', 'Desenvolvido pelo BRICS Tech Forum em parceria com a UnB, a USP e a FGV'],
    
    // Mesa 19 - Lançamento documentário
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '19', 'Alexandre Arns Gonzales', '—', 'Responsável', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '19', 'Paulo Rená', '—', 'Responsável', 'CONFIRMADO', ''],
    
    // Mesa 18 - Curta Juris Máquina
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Tainá Junquilho', 'Diretora do Curta', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Ana Farranha', 'UnB', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Rosane Cordeiro', 'Sindados – MG', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Débora Siroteau', 'CNPD e INPD', 'Palestrante', 'A CONFIRMAR', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Eduardo Marcelino', 'GYO', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Fernanda Rodrigues', 'IRIS', 'Palestrante', 'Aguarando confirmação', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Fernanda Lauria', 'SISEJUFE-RJ', 'Palestrante', 'Aguarando confirmação', ''],
    ['19/05 Ter', 'Auditório 1 (60 lugares)', '18', 'Paulo Rená', '—', 'Responsável', 'CONFIRMADO', ''],
    
    // Mesa 17 - Lançamento livro Teia
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '17', 'Henrique Interlig', 'Interlig', 'Responsável', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Auditório 2 (60 lugares - sem internet)', '17', 'Sérgio Amadeu', '—', 'Convidado', 'CONFIRMADO', ''],
    
    // Roda de Conversa 3
    ['19/05 Ter', 'Sala de Reuniões VIP', '10:30', '12:00', 'Roda de Conversa', 'RC5', 'Nati', 'Coletivo de comunicadoras da Marcha Mundial das Mulheres (MMM)', 'Palestrante', 'CONFIRMADA', ''],
    ['19/05 Ter', 'Sala de Reuniões VIP', '10:30', '12:00', 'Roda de Conversa', 'RC5', 'Inês Simon', 'Jornalista e sindicalista da CUT', 'Palestrante', 'CONFIRMADA', ''],
    ['19/05 Ter', 'Sala de Reuniões VIP', '10:30', '12:00', 'Roda de Conversa', 'RC5', 'Everton Rodrigues', 'Movimento Software Livre e Rede de Economia Solidária', 'Palestrante', 'CONFIRMADO', ''],
    ['19/05 Ter', 'Sala de Reuniões VIP', '10:30', '12:00', 'Roda de Conversa', 'RC5', 'Nati e Everton', '—', 'Responsáveis', 'CONFIRMADO', '']
  ],
  
  stands: [
    ['Rede Mocambos e Casa de Cultura Tainã', 'ACEITO', 'FEITO', 'taina@mocambos.net', ''],
    ['Orgânica.social', 'ACEITO *pedido ajuda', 'FEITO', 'thiago@alquimidia.org / modificando@riseup.net', ''],
    ['Plantaformas', 'pendente', 'FEITO', 'gama@nomade.tec.br', ''],
    ['@s livres', 'ACEITO', 'FEITO', 'aslivres@proton.me', ''],
    ['C3SL', 'pendente', 'FEITO', 'contato@c3sl.ufpr.br', ''],
    ['MariaLab', 'ACEITO *pedido ajuda', 'FEITO', 'contato@marialab.org', ''],
    ['Nuvem Unicamp BR', 'pendente', 'pendente', '—', ''],
    ['Web Social Aberta – Redes do Fediverso – Alquimídia', 'ACEITO', 'FEITO', 'thiago@alquimidia.org', ''],
    ['Laboratorio Hacker de Campinas', 'ACEITO', 'FEITO', 'contato@lhc.net.br', ''],
    ['Garoa Hacker Space', 'pendente', 'FEITO', 'cs@garoa.net.br', ''],
    ['tecnologia do MTST', 'ACEITO', 'FEITO', 'mtst@nucleodetecnologia.com.br', ''],
    ['tecnologia do PSOL', 'ACEITO', 'FEITO', 'contato@psoltecnologia.com.br', ''],
    ['Setor de TI e C&T do PT', 'pendente', 'FEITO', 'rbimbo@gmail.com', ''],
    ['Nupef', 'pendente', 'FEITO', 'contato@nupef.org.br', ''],
    ['Onda.Social', 'pendente', 'FEITO', 'anaribeiro@riseup.net modificando@riseup.net', ''],
    ['Rede Economia Solidaria Feminista', 'pendente', 'FEITO', 'resfnacional@gmail.com', ''],
    ['FNDC', 'pendente', 'FEITO', 'secretaria@fndc.org.br', ''],
    ['Diracom', 'pendente', 'FEITO', 'diracom@diracom.org', ''],
    ['CryptoRave', 'pendente', 'FEITO', 'contato@cryptorave.org', ''],
    ['Frente por IA com direitos sociais', 'pendente', 'pendente', '—', ''],
    ['Comitê de Luta contra a privatização da Celepar', 'pendente', 'pendente', '—', ''],
    ['TV Travessia', 'pendente', 'FEITO', 'quitandasdeminas@gmail.com', ''],
    ['CNBPD – Centro Nacional de Bens Públicos Digitais', 'pendente', 'pendente', '—', ''],
    ['IARA', 'pendente', 'pendente', '—', ''],
    ['Lab Livre UFABC', 'CONDICIONAL *pedido ajuda', 'FEITO', 'lablivre@ufabc.edu.br', ''],
    ['Tá certo isso aí? USP Sao Carlos', 'pendente', 'pendente', '—', 'Verificar se é o certo'],
    ['Lab Livre UnB', 'pendente', 'FEITO', 'caguiar@unb.br', ''],
    ['IsaCloud', 'pendente', 'FEITO', 'isa@isacloud.cc', ''],
    ['LK Camp', 'pendente', 'pendente', 'vpeixoto@lkcamp.dev gbittencourt@lkcamp.dev', ''],
    ['Caninos Loucos', 'pendente', 'pendente', '—', ''],
    ['Tecnologia da UP', 'pendente', '—', '—', ''],
    ['CDR', 'ACEITO *aguarda nome', 'FEITO', 'secretariaexecutiva@direitosnarede.org.br', ''],
    ['Estande livro "Teias" – Henrique Pereira Interlig', 'ACEITO', 'pendente', 'henrique@interlig.com.br', ''],
    ['Coletivo Digital', 'pendente', 'FEITO', 'coletivodigital@coletivodigital.org.br', ''],
    ['Felicilab', 'pendente', 'FEITO', 'contato@felicilab.org.br', ''],
    ['Donas Security – Coletivo de mulheres em cybersegurança', 'pendente', 'pendente', '—', ''],
    ['JecoGeo – senfhosting', 'pendente', 'pendente', '—', '']
  ]
};

// Criar workbook
const wb = new ExcelJS.Workbook();

// Adicionar aba de programação
const wsProgramacao = wb.addWorksheet('Programação');
wsProgramacao.columns = [
  { header: 'Data', key: 'data', width: 15 },
  { header: 'Local', key: 'local', width: 25 },
  { header: 'Início', key: 'inicio', width: 10 },
  { header: 'Fim', key: 'fim', width: 10 },
  { header: 'Tipo', key: 'tipo', width: 15 },
  { header: 'Mesa Nº', key: 'mesa', width: 10 },
  { header: 'Título / Atividade', key: 'titulo', width: 60 },
  { header: 'Responsável', key: 'responsavel', width: 20 },
  { header: 'Notas / Pendências', key: 'notas', width: 50 }
];

// Adicionando diretamente os dados (sem adicionar linha de cabeçalho como dado)
// Começa a adicionar dados a partir da linha 2, mantendo a estrutura esperada pelo script de build
dadosProgramacao.programacao.forEach(row => {
  wsProgramacao.addRow(row);
});

// Adicionar aba de palestrantes
const wsPalestrantes = wb.addWorksheet('Palestrantes');
wsPalestrantes.columns = [
  { header: 'Data', key: 'data', width: 15 },
  { header: 'Local', key: 'local', width: 25 },
  { header: 'Mesa', key: 'mesa', width: 15 },
  { header: 'Nome', key: 'nome', width: 25 },
  { header: 'Organização / Instituição', key: 'organizacao', width: 30 },
  { header: 'Papel', key: 'papel', width: 15 },
  { header: 'Status', key: 'status', width: 15 },
  { header: 'Observações', key: 'obs', width: 50 }
];

// Adicionando diretamente os dados
dadosProgramacao.palestrantes.forEach(row => {
  wsPalestrantes.addRow(row);
});

// Adicionar aba de stands
const wsStands = wb.addWorksheet('Stands');
wsStands.columns = [
  { header: 'Organização / Iniciativa', key: 'organizacao', width: 40 },
  { header: 'Status Aceite', key: 'statusAceite', width: 15 },
  { header: 'Status E-mail', key: 'statusEmail', width: 15 },
  { header: 'Contato / E-mail', key: 'contato', width: 40 },
  { header: 'Observações', key: 'obs', width: 50 }
];

// Adicionando diretamente os dados
dadosProgramacao.stands.forEach(row => {
  wsStands.addRow(row);
});

// Salvar workbook
wb.xlsx.writeFile('./src/data/programacao.xlsx').then(async () => {
  console.log('Arquivo XLSX atualizado gerado com sucesso!');
  console.log(`Total de sessões: ${dadosProgramacao.programacao.length}`);
  console.log(`Total de palestrantes: ${dadosProgramacao.palestrantes.length}`);
  console.log(`Total de stands: ${dadosProgramacao.stands.length}`);

  // Agora gerar o JSON correspondente usando o script oficial
  const { buildJson } = await import('./build-programacao.mjs');
  console.log('JSON gerado com sucesso!');
});