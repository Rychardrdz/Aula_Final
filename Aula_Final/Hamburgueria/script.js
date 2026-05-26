// Variáveis principais do carrinho
let total = 0; // Valor total da compra
let quantidade = 0; // Quantidade de itens
let pedidos = []; // Lista dos produtos adicionados

// Função que adiciona produtos no carrinho
function adicionarCarrinho(nome, preco) {

    pedidos.push({ nome, preco }); // Adiciona produto na lista
    quantidade++; // Soma +1 item
    total += preco; // Soma o valor do produto

    const carrinho = document.getElementById("itens-carrinho"); // Pega área do carrinho
    const item = document.createElement("div"); // Cria uma div nova

    item.classList.add("item-carrinho"); // Coloca classe no item

    // Estrutura do item do carrinho
    item.innerHTML = `
        <span>${nome}</span>

        <div>
            <strong>R$ ${preco.toFixed(2)}</strong>
            <button class="remover">✖</button>
        </div>
    `;

    carrinho.appendChild(item); // Coloca item no carrinho

    atualizarCarrinho(); // Atualiza total e contador
    animarCarrinho(); // Faz animação do carrinho

    // Botão de remover item
    item.querySelector(".remover").addEventListener("click", () => {

        item.remove(); // Remove item da tela
        quantidade--; // Remove 1 da quantidade
        total -= preco; // Diminui valor total

        atualizarCarrinho(); // Atualiza carrinho novamente
    });
}

// Atualiza valor total e contador
function atualizarCarrinho() {

    document.getElementById("total").innerHTML =
        `R$ ${total.toFixed(2)}`;

    document.getElementById("contador-flutuante").innerHTML =
        quantidade;
}

// Abre carrinho lateral
function abrirCarrinho() {

    document.getElementById("carrinho")
        .classList.add("ativo");

    document.getElementById("overlay")
        .classList.add("ativo");
}

// Fecha carrinho lateral
function fecharCarrinho() {

    document.getElementById("carrinho")
        .classList.remove("ativo");

    document.getElementById("overlay")
        .classList.remove("ativo");
}

// Faz efeito de animação no botão do carrinho
function animarCarrinho() {

    const carrinho =
        document.querySelector(".carrinho-flutuante");

    carrinho.style.transform = "scale(1.15)"; // Aumenta tamanho

    setTimeout(() => {
        carrinho.style.transform = "scale(1)"; // Volta ao normal
    }, 200);
}

// Mostra formulário do checkout
function abrirCheckout() {

    document.getElementById("checkout")
        .style.display = "flex";
}

// Busca endereço automaticamente usando o CEP
document.getElementById("cep")
    .addEventListener("blur", async () => {

        // Pega CEP digitado
        const cep = document.getElementById("cep")
            .value.replace("-", "");

        // Busca dados na API ViaCEP
        const dados = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        ).then(res => res.json());

        // Preenche rua e bairro automaticamente
        document.getElementById("rua").value =
            dados.logradouro;

        document.getElementById("bairro").value =
            dados.bairro;
    });

// Envia pedido para o WhatsApp
function enviarWhatsapp() {

    // Pega dados do cliente
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const pagamento = document.getElementById("pagamento").value;

    // Começa mensagem
    let mensagem =
        `🍔 *NOVO PEDIDO - BRASA BURGUER*%0A%0A`;

    // Adiciona produtos na mensagem
    pedidos.forEach(item => {

        mensagem +=
            `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
    });

    // Adiciona informações finais
    mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;
    mensagem += `%0A%0A👤 *Cliente:* ${nome}`;
    mensagem += `%0A📞 *Telefone:* ${telefone}`;
    mensagem += `%0A🏠 *Endereço:* ${rua}, ${numero} - ${bairro}`;
    mensagem += `%0A💳 *Pagamento:* ${pagamento}`;

    const numeroLoja = "11999321206"; // Número da hamburgueria

    // Abre conversa no WhatsApp
    window.open(
        `https://wa.me/${numeroLoja}?text=${mensagem}`,
        "_blank"
    );
}