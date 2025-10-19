// Aguarda o carregamento completo do DOM antes de executar o script.
document.addEventListener("DOMContentLoaded", () => {
  // --- BANCO DE DADOS DE PERGUNTAS ---
  // Cada tema (phishing, malware, password) contém uma lista de objetos de pergunta.
  const questionsData = {
    phishing: {
      title: "Phishing",
      questions: [
        {
          question:
            "Você recebe um e-mail do seu banco pedindo para confirmar sua senha clicando em um link. O que você faz?",
          answers: [
            { text: "Clico no link e confirmo minha senha.", correct: false },
            {
              text: "Ignoro o e-mail e acesso o site do banco digitando o endereço no navegador.",
              correct: true,
            },
            { text: "Respondo o e-mail com minha senha.", correct: false },
            {
              text: "Encaminho o e-mail para um amigo perguntando se é seguro.",
              correct: false,
            },
          ],
          explanation:
            "Nunca clique em links suspeitos ou forneça dados em resposta a e-mails. Acesse sempre o site oficial digitando o endereço diretamente no seu navegador. Isso evita que você caia em uma página falsa projetada para roubar seus dados.",
        },
        {
          question:
            'Qual das seguintes URLs é mais provável de ser um site legítimo do "Banco Exemplo"?',
          answers: [
            { text: "www.banco-exemplo.com", correct: false },
            { text: "www.bancoexemplo.net", correct: false },
            { text: "https://www.bancoexemplo.com", correct: true },
            { text: "http://login.bancoexemplo.com.br.xyz/", correct: false },
          ],
          explanation:
            "Sites legítimos, especialmente de bancos, usam HTTPS para criptografar a conexão (o 's' em https indica segurança). Domínios complicados ou com terminações estranhas (.xyz, .net em vez de .com) são sinais de alerta.",
        },
        {
          question: 'O que é "Spear Phishing"?',
          answers: [
            {
              text: "Um e-mail de phishing enviado para milhões de pessoas.",
              correct: false,
            },
            {
              text: "Um ataque de phishing que usa mensagens de texto (SMS).",
              correct: false,
            },
            {
              text: "Um ataque de phishing direcionado a uma pessoa ou empresa específica.",
              correct: true,
            },
            { text: "Um tipo de pescaria esportiva.", correct: false },
          ],
          explanation:
            "Spear phishing é um ataque altamente personalizado. O golpista pesquisa a vítima para tornar o e-mail o mais convincente possível, usando informações como seu nome, cargo ou local de trabalho.",
        },
      ],
    },
    malware: {
      title: "Malwares",
      questions: [
        {
          question: "Qual é a melhor maneira de se proteger contra malwares?",
          answers: [
            { text: "Nunca desligar o computador.", correct: false },
            {
              text: "Manter o sistema operacional e o antivírus sempre atualizados.",
              correct: true,
            },
            {
              text: "Baixar aplicativos apenas de sites desconhecidos.",
              correct: false,
            },
            {
              text: "Clicar em todos os pop-ups que aparecem na tela.",
              correct: false,
            },
          ],
          explanation:
            "Atualizações de segurança corrigem vulnerabilidades que os malwares exploram. Manter seu sistema e antivírus em dia é a linha de defesa mais eficaz contra novas ameaças.",
        },
        {
          question: "O que é um Ransomware?",
          answers: [
            { text: "Um vírus que rouba suas senhas.", correct: false },
            {
              text: "Um software que exibe anúncios indesejados.",
              correct: false,
            },
            {
              text: "Um malware que criptografa seus arquivos e exige um resgate para liberá-los.",
              correct: true,
            },
            {
              text: "Um programa que monitora o que você digita.",
              correct: false,
            },
          ],
          explanation:
            "Ransomware 'sequestra' seus arquivos, tornando-os inacessíveis. Os criminosos então exigem um pagamento (resgate) para fornecer a chave de descriptografia. Fazer backups regulares é a melhor proteção.",
        },
      ],
    },
    password: {
      title: "Senhas Seguras",
      questions: [
        {
          question: "Qual das senhas abaixo é a mais segura?",
          answers: [
            { text: "12345678", correct: false },
            { text: "minhasenha", correct: false },
            { text: "Jo@o_B0b0_C@rr0", correct: true },
            { text: "senha123", correct: false },
          ],
          explanation:
            "Uma senha forte é longa e complexa, misturando letras maiúsculas, minúsculas, números e símbolos. Frases-senha são uma ótima técnica para criar senhas fáceis de lembrar, mas difíceis de adivinhar.",
        },
        {
          question: "O que é a Autenticação de Dois Fatores (2FA)?",
          answers: [
            {
              text: "Usar a mesma senha em dois sites diferentes.",
              correct: false,
            },
            {
              text: "Uma camada extra de segurança que exige um segundo código para fazer login.",
              correct: true,
            },
            { text: "Trocar sua senha duas vezes por ano.", correct: false },
            { text: "Um software que gera senhas para você.", correct: false },
          ],
          explanation:
            "A 2FA adiciona uma etapa de verificação, como um código enviado para o seu celular. Mesmo que alguém descubra sua senha, não conseguirá acessar sua conta sem esse segundo fator.",
        },
      ],
    },
  };

  // --- ELEMENTOS DO DOM ---
  // Seleciona todos os elementos da interface do quiz que serão manipulados.
  const quizGameEl = document.getElementById("quiz-game");
  const scoreScreenEl = document.getElementById("score-screen");
  const themeTitleEl = document.getElementById("quiz-theme-title");
  const progressEl = document.getElementById("quiz-progress");
  const questionTextEl = document.getElementById("question-text");
  const answerButtonsEl = document.getElementById("answer-buttons");
  const explanationEl = document.getElementById("explanation");
  const explanationTextEl = document.getElementById("explanation-text");
  const nextButton = document.getElementById("next-btn");
  const scoreTextEl = document.getElementById("score-text");
  const playAgainButton = document.getElementById("play-again-btn");

  // --- ESTADO DO JOGO ---
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  /**
   * Inicia o jogo: carrega as perguntas do tema e exibe a primeira questão.
   */
  function startGame() {
    // Pega o parâmetro 'theme' da URL.
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme") || "phishing"; // Tema padrão caso nenhum seja fornecido

    // Carrega as perguntas do tema selecionado.
    const themeData = questionsData[theme];
    if (!themeData) {
      alert("Tema não encontrado!");
      window.location.href = "quizz__menu.html";
      return;
    }

    currentQuestions = themeData.questions;
    themeTitleEl.innerText = themeData.title;

    // Reseta o estado do jogo.
    currentQuestionIndex = 0;
    score = 0;

    // Exibe a tela do jogo e oculta a de pontuação.
    quizGameEl.classList.remove("hidden");
    scoreScreenEl.classList.add("hidden");

    showQuestion();
  }

  /**
   * Exibe a pergunta atual e suas opções de resposta.
   */
  function showQuestion() {
    resetState();
    const question = currentQuestions[currentQuestionIndex];

    // Atualiza os textos da pergunta e do progresso.
    questionTextEl.innerText = question.question;
    progressEl.innerText = `Pergunta ${currentQuestionIndex + 1} de ${
      currentQuestions.length
    }`;

    // Cria os botões de resposta.
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("button", "button--answer");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsEl.appendChild(button);
    });
  }

  /**
   * Reseta o estado da interface antes de mostrar uma nova pergunta.
   */
  function resetState() {
    nextButton.classList.add("hidden");
    explanationEl.classList.add("hidden");
    while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
  }

  /**
   * É chamada quando o usuário clica em uma resposta.
   * @param {Event} e O evento de clique.
   */
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Incrementa a pontuação se a resposta for correta.
    if (isCorrect) {
      score++;
      selectedBtn.classList.add("correct");
    } else {
      selectedBtn.classList.add("incorrect");
    }

    // Mostra qual era a resposta correta.
    Array.from(answerButtonsEl.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      // Desabilita todos os botões após a seleção.
      button.disabled = true;
    });

    // Mostra a explicação e o botão de próxima.
    explanationTextEl.innerText =
      currentQuestions[currentQuestionIndex].explanation;
    explanationEl.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }

  /**
   * Exibe a tela de pontuação final.
   */
  function showScore() {
    quizGameEl.classList.add("hidden");
    scoreScreenEl.classList.remove("hidden");
    scoreTextEl.innerText = `Você acertou ${score} de ${currentQuestions.length} perguntas.`;
  }

  /**
   * Lida com o clique no botão "Próxima".
   */
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  // --- EVENT LISTENERS ---
  nextButton.addEventListener("click", handleNextButton);
  playAgainButton.addEventListener("click", startGame); // Reinicia o jogo.

  // --- INICIALIZAÇÃO ---
  startGame();
});
