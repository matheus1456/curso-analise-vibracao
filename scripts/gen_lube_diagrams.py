import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Wedge, Rectangle, FancyArrowPatch, Ellipse, Polygon, FancyBboxPatch
import os

plt.rcParams.update({"font.size": 11})
OUT = "/tmp/imgs_lube/"
os.makedirs(OUT, exist_ok=True)

BLUE = "#1f5fa8"
ORANGE = "#b5462a"
GREEN = "#2a9d3e"
GREY = "#6b7280"
LGREY = "#c9ced6"
DARK = "#1a2733"
YELLOW = "#d1a02a"
PURPLE = "#6b4fa0"

def new_fig(figsize=(9, 5)):
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_xlim(0, 10); ax.set_ylim(0, 10)
    ax.axis("off")
    return fig, ax

def title(ax, text, y=9.6):
    ax.text(5, y, text, ha="center", va="top", fontsize=13, fontweight="bold", color=DARK)

def save(fig, fname, top=None):
    fig.tight_layout(rect=[0, 0, 1, top] if top else None)
    fig.savefig(OUT + fname, dpi=150, facecolor="white")
    plt.close(fig)
    print("saved", fname)

# ==================================================================
# L1 - Curva de Stribeck (regimes de lubrificacao)
# ==================================================================
fig, ax = plt.subplots(figsize=(9, 5.5))
x = np.linspace(0.05, 10, 400)
# curva em U: atrito alto em boundary, cai no misto, sobe suave no hidrodinamico
y = 0.14 * np.exp(-1.4 * x) + 0.02 + 0.006 * (x - 3.2) ** 2 * (x > 3.2)
ax.plot(x, y, color=BLUE, linewidth=2.8)
ax.axvspan(0, 1.4, color=ORANGE, alpha=0.12)
ax.axvspan(1.4, 3.2, color=YELLOW, alpha=0.14)
ax.axvspan(3.2, 10, color=GREEN, alpha=0.12)
ax.text(0.7, 0.145, "Limítrofe\n(boundary)", ha="center", fontsize=10.5, color=ORANGE, fontweight="bold")
ax.text(2.3, 0.145, "Filme misto", ha="center", fontsize=10.5, color="#8a6d1a", fontweight="bold")
ax.text(6.5, 0.145, "Hidrodinâmico / EHD", ha="center", fontsize=10.5, color=GREEN, fontweight="bold")
ax.annotate("Contato metal-metal\n(depende de aditivos AW/EP)", xy=(0.5, 0.10), xytext=(0.9, 0.09),
            fontsize=8.8, color=DARK)
ax.annotate("Filme completo\n(desgaste ~ zero)", xy=(7, 0.03), xytext=(7.3, 0.06),
            fontsize=8.8, color=DARK)
ax.set_xlabel("Parâmetro de Stribeck  (viscosidade × velocidade) / carga", fontsize=10.5)
ax.set_ylabel("Coeficiente de atrito", fontsize=10.5)
ax.set_xlim(0, 10); ax.set_ylim(0, 0.16)
ax.set_xticks([]); ax.set_yticks([])
ax.spines[["top", "right"]].set_visible(False)
ax.set_title("Curva de Stribeck — os 3 regimes de lubrificação (Módulo L1)", fontsize=13, fontweight="bold", color=DARK, pad=14)
save(fig, "lub_01_stribeck.png")

# ==================================================================
# L2 - Composicao tipica de um oleo lubrificante (base + aditivos)
# ==================================================================
fig, ax = plt.subplots(figsize=(8, 6))
sizes = [88, 4, 3, 2, 1.5, 1.5]
labels = ["Óleo base\n(~88%)", "Melhorador de VI", "Antioxidante", "Antidesgaste/EP", "Detergente/\ndispersante", "Outros aditivos"]
colors = [BLUE, GREEN, ORANGE, YELLOW, PURPLE, GREY]
wedges, texts = ax.pie(sizes, colors=colors, startangle=90, wedgeprops=dict(edgecolor="white", linewidth=1.5),
                        labels=labels, labeldistance=1.12, textprops={"fontsize": 9.5, "color": DARK})
ax.set_title("Composição típica de um óleo lubrificante industrial", fontsize=13, fontweight="bold", color=DARK, pad=16)
save(fig, "lub_02_composicao_oleo.png")

# ==================================================================
# L2 - Viscosidade x Temperatura para VI baixo/alto
# ==================================================================
fig, ax = plt.subplots(figsize=(9, 5.5))
T = np.linspace(-20, 120, 300)
visc_low_vi = 460 * np.exp(-0.045 * (T + 20))
visc_high_vi = 460 * np.exp(-0.028 * (T + 20))
ax.plot(T, visc_low_vi, color=ORANGE, linewidth=2.5, label="Baixo IV (VI ~ 90) — mineral comum")
ax.plot(T, visc_high_vi, color=BLUE, linewidth=2.5, label="Alto IV (VI ~ 150) — PAO sintético")
ax.set_yscale("log")
ax.set_xlabel("Temperatura (°C)", fontsize=11)
ax.set_ylabel("Viscosidade (cSt, escala log)", fontsize=11)
ax.set_title("Efeito do Índice de Viscosidade (VI) na estabilidade viscosa", fontsize=13, fontweight="bold", color=DARK, pad=14)
ax.legend(fontsize=9.5, loc="upper right")
ax.grid(alpha=0.25)
ax.spines[["top", "right"]].set_visible(False)
save(fig, "lub_03_viscosidade_temperatura.png")

# ==================================================================
# L3 - Estrutura da graxa (oleo retido no espessante)
# ==================================================================
fig, ax = new_fig((9, 5.5))
title(ax, "Estrutura da graxa: óleo retido pelo espessante")
np.random.seed(7)
# malha de fibras do espessante
for i in range(26):
    x0, y0 = np.random.uniform(1, 9), np.random.uniform(1.5, 8)
    ang = np.random.uniform(0, np.pi)
    L = np.random.uniform(0.5, 1.1)
    x1, y1 = x0 + L * np.cos(ang), y0 + L * np.sin(ang)
    ax.plot([x0, x1], [y0, y1], color=GREY, linewidth=1.6, alpha=0.75, solid_capstyle="round")
# gotas de oleo retidas
for i in range(16):
    x0, y0 = np.random.uniform(1.3, 8.7), np.random.uniform(1.8, 7.8)
    ax.add_patch(Circle((x0, y0), 0.22, facecolor=YELLOW, alpha=0.75, edgecolor="none"))
ax.text(5, 0.6, "Fibras de espessante (rede tridimensional)  •  Gotas de óleo retidas por capilaridade",
        ha="center", fontsize=9.5, color=DARK)
save(fig, "lub_04_estrutura_graxa.png")

# ==================================================================
# L3 - Escala de consistencia NLGI
# ==================================================================
fig, ax = plt.subplots(figsize=(9.5, 4.2))
grades = ["000", "00", "0", "1", "2", "3", "4", "5", "6"]
penetration_mid = [455, 415, 375, 325, 285, 245, 205, 165, 125]
colors_bar = [BLUE if g != "2" else ORANGE for g in grades]
bars = ax.bar(grades, penetration_mid, color=colors_bar, edgecolor="white")
ax.set_ylabel("Penetração trabalhada (0,1 mm) — valor típico central", fontsize=9.8)
ax.set_xlabel("Grau NLGI", fontsize=10.5)
ax.set_title("Escala de consistência NLGI (menor penetração = mais dura)", fontsize=13, fontweight="bold", color=DARK, pad=14)
ax.annotate("Grau 2 — uso geral\nmais comum", xy=(4, 285), xytext=(5.6, 360),
            arrowprops=dict(arrowstyle="-|>", color=ORANGE, lw=1.6), fontsize=9.5, color=ORANGE, fontweight="bold")
ax.spines[["top", "right"]].set_visible(False)
save(fig, "lub_05_escala_nlgi.png")

# ==================================================================
# L4 - Selecao de viscosidade ISO VG por aplicacao (faixas)
# ==================================================================
fig, ax = plt.subplots(figsize=(9.5, 5))
apps = ["Hidráulico /\nmancais alta rotação", "Redutores\nuso geral", "Redutores\nindustriais pesados", "Engrenagens abertas\nbaixa rotação"]
lo = [32, 68, 150, 320]
hi = [46, 100, 220, 460]
y_pos = np.arange(len(apps))
for i in range(len(apps)):
    ax.barh(y_pos[i], hi[i] - lo[i], left=lo[i], height=0.5, color=BLUE, alpha=0.85)
    ax.text((lo[i] + hi[i]) / 2, y_pos[i], f"ISO VG {lo[i]}–{hi[i]}", ha="center", va="center",
            fontsize=9.5, color="white", fontweight="bold")
ax.set_yticks(y_pos); ax.set_yticklabels(apps, fontsize=10)
ax.set_xlabel("Grau de viscosidade ISO VG (cSt a 40°C)", fontsize=10.5)
ax.set_title("Faixas típicas de viscosidade ISO VG por aplicação", fontsize=13, fontweight="bold", color=DARK, pad=14)
ax.set_xlim(0, 500)
ax.spines[["top", "right"]].set_visible(False)
save(fig, "lub_06_selecao_isovg.png")

# ==================================================================
# L5 - Armazenamento correto x incorreto de tambor
# ==================================================================
fig, axs = plt.subplots(1, 2, figsize=(10, 5))
for ax, correct in zip(axs, [False, True]):
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.set_aspect("equal"); ax.axis("off")
    if not correct:
        # tambor vertical, tampa pra cima, agua acumulada
        ax.add_patch(Rectangle((3, 1), 4, 6, facecolor="#dfe7f2", edgecolor=BLUE, linewidth=2))
        ax.add_patch(Ellipse((5, 7), 4, 0.9, facecolor="#c9ced6", edgecolor=BLUE, linewidth=2))
        for dx in [-1.1, -0.3, 0.5, 1.3]:
            ax.add_patch(Circle((5 + dx, 7.35), 0.18, facecolor="#5a9bd8", alpha=0.85, edgecolor="none"))
        ax.annotate("Água da chuva\nse acumula na tampa", xy=(5.6, 7.3), xytext=(7.3, 8.6),
                    arrowprops=dict(arrowstyle="-|>", color=ORANGE, lw=1.6), fontsize=9, color=ORANGE, fontweight="bold")
        ax.text(5, 0.4, "X  Incorreto: tampa para cima", ha="center", fontsize=11, color=ORANGE, fontweight="bold")
    else:
        # tambor deitado
        ax.add_patch(Ellipse((2.3, 4), 1.4, 3.6, facecolor="#c9ced6", edgecolor=BLUE, linewidth=2))
        ax.add_patch(Rectangle((2.3, 2.2), 5.4, 3.6, facecolor="#dfe7f2", edgecolor=BLUE, linewidth=2))
        ax.add_patch(Ellipse((7.7, 4), 1.4, 3.6, facecolor="#c9ced6", edgecolor=BLUE, linewidth=2))
        ax.text(5, 0.4, "OK  Correto: tambor deitado (ou tampa lateral 3h/9h)", ha="center", fontsize=11, color=GREEN, fontweight="bold")
save(fig, "lub_07_armazenamento_tambor.png")

# ==================================================================
# L5 - Intervalo de relubrificacao x temperatura (regra da metade a cada 15C)
# ==================================================================
fig, ax = plt.subplots(figsize=(9, 5.2))
T = np.array([60, 75, 90, 105, 120])
interval = np.array([100, 50, 25, 12.5, 6.25])
ax.plot(T, interval, marker="o", color=BLUE, linewidth=2.5, markersize=8)
for xi, yi in zip(T, interval):
    ax.annotate(f"{yi:.1f}%", xy=(xi, yi), xytext=(xi, yi + 6), ha="center", fontsize=9.5, color=DARK, fontweight="bold")
ax.set_xlabel("Temperatura de operação (°C)", fontsize=10.5)
ax.set_ylabel("Intervalo de relubrificação\n(% do intervalo de referência a 60°C)", fontsize=10)
ax.set_title("Regra prática: cada +15°C reduz o intervalo de relubrificação pela metade", fontsize=12.5, fontweight="bold", color=DARK, pad=14)
ax.grid(alpha=0.25)
ax.spines[["top", "right"]].set_visible(False)
save(fig, "lub_08_intervalo_relube_temperatura.png")

# ==================================================================
# L6 - ISO 4406: contagem de particulas por faixa de tamanho
# ==================================================================
fig, ax = plt.subplots(figsize=(9.5, 5))
codes = ["13/11/8\n(precisão)", "16/14/11\n(uso geral)", "18/16/13\n(aceitável)", "22/20/17\n(sem controle)"]
c4 = [320, 2500, 10000, 160000]
c6 = [80, 640, 2500, 40000]
c14 = [10, 80, 320, 5000]
x = np.arange(len(codes))
w = 0.25
ax.bar(x - w, c4, width=w, color=BLUE, label="≥ 4 µm")
ax.bar(x, c6, width=w, color=ORANGE, label="≥ 6 µm")
ax.bar(x + w, c14, width=w, color=GREEN, label="≥ 14 µm")
ax.set_yscale("log")
ax.set_xticks(x); ax.set_xticklabels(codes, fontsize=9.5)
ax.set_ylabel("Partículas por mL (escala log)", fontsize=10.5)
ax.set_title("Código ISO 4406 — contagem de partículas por faixa de tamanho", fontsize=13, fontweight="bold", color=DARK, pad=14)
ax.legend(fontsize=9.5)
ax.spines[["top", "right"]].set_visible(False)
save(fig, "lub_09_iso4406.png")

# ==================================================================
# L6 - Beta ratio x eficiencia do filtro
# ==================================================================
fig, ax = plt.subplots(figsize=(9, 5))
beta = np.array([1, 2, 5, 10, 20, 75, 100, 200, 1000])
eff = (1 - 1 / beta) * 100
ax.plot(beta, eff, marker="o", color=BLUE, linewidth=2.5, markersize=7)
ax.set_xscale("log")
ax.axhline(99.5, color=ORANGE, linestyle="--", linewidth=1.3)
ax.text(1.2, 99.7, "β=200 → 99,5% de eficiência", color=ORANGE, fontsize=9.5, fontweight="bold")
ax.set_xlabel("Beta ratio (βₓ) para o tamanho de partícula x", fontsize=10.5)
ax.set_ylabel("Eficiência de captura (%)", fontsize=10.5)
ax.set_title("Beta ratio (ISO 16889) e eficiência de filtração", fontsize=13, fontweight="bold", color=DARK, pad=14)
ax.grid(alpha=0.25)
ax.spines[["top", "right"]].set_visible(False)
save(fig, "lub_10_beta_ratio.png")

# ==================================================================
# L7 - Ponto de amostragem correto em sistema de circulacao
# ==================================================================
fig, ax = new_fig((9.5, 5.5))
title(ax, "Ponto de amostragem correto num sistema de circulação de óleo")
# reservatorio
ax.add_patch(Rectangle((0.6, 0.8), 2.4, 2, facecolor="#dfe7f2", edgecolor=BLUE, linewidth=2))
ax.text(1.8, 1.8, "Reservatório", ha="center", fontsize=9.5, color=DARK)
# bomba
ax.add_patch(Circle((3.6, 1.8), 0.5, facecolor=GREY, edgecolor=DARK, linewidth=1.5))
ax.text(3.6, 1.8, "Bomba", ha="center", va="center", fontsize=8, color="white")
# linha ate a maquina
ax.annotate("", xy=(5.2, 1.8), xytext=(4.1, 1.8), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=2))
# maquina (zona de interesse)
ax.add_patch(Rectangle((5.2, 1.2), 1.6, 1.2, facecolor="#c9ced6", edgecolor=BLUE, linewidth=2))
ax.text(6.0, 1.8, "Máquina", ha="center", fontsize=9, color=DARK)
# valvula de amostragem - PONTO CORRETO (a jusante da maquina, a montante do filtro)
ax.annotate("", xy=(7.6, 1.8), xytext=(6.8, 1.8), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=2))
ax.add_patch(Circle((7.9, 1.8), 0.28, facecolor=GREEN, edgecolor=DARK, linewidth=1.5))
ax.annotate("Ponto de amostragem correto\n(zona de turbulência ativa,\na jusante da máquina)", xy=(7.9, 1.8), xytext=(7.3, 4.2),
            arrowprops=dict(arrowstyle="-|>", color=GREEN, lw=1.8), fontsize=9.3, color=GREEN, fontweight="bold", ha="center")
# filtro de retorno
ax.add_patch(Rectangle((8.6, 1.2), 1.0, 1.2, facecolor="#dfe7f2", edgecolor=BLUE, linewidth=2))
ax.text(9.1, 1.8, "Filtro\nretorno", ha="center", va="center", fontsize=7.5, color=DARK)
ax.annotate("", xy=(8.6, 1.8), xytext=(8.18, 1.8), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=2))
ax.annotate("", xy=(1.8, 1.2), xytext=(9.1, 1.2), arrowprops=dict(arrowstyle="-", color=DARK, lw=1.4, connectionstyle="arc3,rad=-0.35"))
ax.text(5, 6.8, "Coletar a jusante do ponto de interesse e a montante do filtro,\nsempre no MESMO ponto entre coletas, após descartar o volume de purga", ha="center", fontsize=9, color=DARK, style="italic")
save(fig, "lub_11_ponto_amostragem.png")

# ==================================================================
# L8 - Morfologia de particulas de desgaste (ferrografia) - ilustrativo
# ==================================================================
fig, axs = plt.subplots(1, 5, figsize=(14, 3.4))
def draw_particle(ax, kind):
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.set_aspect("equal"); ax.axis("off")
    if kind == "corte":
        pts = [(2, 5), (7, 6.2), (7.6, 5.6), (2.4, 4.2)]
        ax.add_patch(Polygon(pts, closed=True, facecolor=GREY, edgecolor=DARK, linewidth=1.3))
        ax.text(5, 1.5, "Corte (cutting)\nDesgaste abrasivo severo", ha="center", fontsize=8.7, color=DARK)
    elif kind == "esferica":
        ax.add_patch(Circle((5, 5.5), 1.5, facecolor=BLUE, edgecolor=DARK, linewidth=1.3, alpha=0.85))
        ax.add_patch(Circle((4.5, 6), 0.35, facecolor="white", alpha=0.5))
        ax.text(5, 1.5, "Esférica\nFadiga inicial (subsuperficial)", ha="center", fontsize=8.7, color=DARK)
    elif kind == "laminar":
        pts = [(2.5, 5.8), (7.2, 6.5), (7.5, 5.9), (2.8, 5.1)]
        ax.add_patch(Polygon(pts, closed=True, facecolor="#9db3cc", edgecolor=DARK, linewidth=1.1))
        ax.text(5, 1.5, "Laminar\nFadiga avançada (spalling)", ha="center", fontsize=8.7, color=DARK)
    elif kind == "oxido_vermelho":
        ax.add_patch(Circle((5, 5.5), 1.3, facecolor="#b5462a", edgecolor=DARK, linewidth=1.1, alpha=0.85))
        ax.text(5, 1.5, "Óxido vermelho\nCorrosão (ferrugem/água)", ha="center", fontsize=8.7, color=DARK)
    elif kind == "polimero":
        ax.add_patch(Ellipse((5, 5.5), 3, 1.6, facecolor="#d1a02a", edgecolor=DARK, linewidth=1.1, alpha=0.8))
        ax.text(5, 1.5, "Polímero de fricção\nProduto de aditivo EP/AW", ha="center", fontsize=8.7, color=DARK)
for ax, kind in zip(axs, ["corte", "esferica", "laminar", "oxido_vermelho", "polimero"]):
    draw_particle(ax, kind)
fig.suptitle("Morfologia de partículas de desgaste (ferrografia analítica) — diagrama ilustrativo", fontsize=12.5, fontweight="bold", color=DARK, y=0.99)
save(fig, "lub_12_morfologia_particulas.png", top=0.86)

# ==================================================================
# L9 - Etiqueta LIS (Sistema de Identificacao de Lubrificantes) - mockup ilustrativo
# ==================================================================
fig, axs = plt.subplots(1, 2, figsize=(10, 4.6))
# oleo
ax = axs[0]
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.set_aspect("equal"); ax.axis("off")
ax.add_patch(FancyBboxPatch((0.6, 1.5), 8.8, 7, boxstyle="round,pad=0.1,rounding_size=0.3",
                             facecolor="white", edgecolor=DARK, linewidth=2))
ax.add_patch(Circle((2.1, 7), 0.9, facecolor=YELLOW, edgecolor=DARK, linewidth=1.5))  # forma geometrica = tipo
ax.add_patch(Rectangle((3.5, 6.55), 5.0, 0.9, facecolor=BLUE, edgecolor="none"))
ax.text(6.0, 7, "COR = viscosidade", ha="center", va="center", fontsize=8.3, color="white", fontweight="bold")
ax.text(5, 5.2, "ISO 6743: L-HM  •  ISO VG 68", ha="center", fontsize=9.5, color=DARK, fontweight="bold")
ax.text(5, 4.2, "Código LIS: OH-068-B2", ha="center", fontsize=10.5, color=ORANGE, fontweight="bold")
ax.text(5, 3.0, "Ponto: Redutor Linha 2\nMancal de Entrada", ha="center", fontsize=8.5, color=DARK)
ax.text(5, 1.9, "(óleo — forma geométrica indica o tipo)", ha="center", fontsize=7.4, color=GREY, style="italic")
ax.set_title("Etiqueta LIS — lubrificante líquido (ilustrativo)", fontsize=10.8, fontweight="bold", color=DARK, pad=10)
# graxa
ax = axs[1]
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.set_aspect("equal"); ax.axis("off")
ax.add_patch(FancyBboxPatch((0.6, 1.5), 8.8, 7, boxstyle="round,pad=0.1,rounding_size=0.3",
                             facecolor="white", edgecolor=DARK, linewidth=2))
ax.add_patch(Polygon([(1.5, 6.3), (2.7, 6.3), (2.1, 7.7)], closed=True, facecolor=GREEN, edgecolor=DARK, linewidth=1.5))
ax.add_patch(Rectangle((3.5, 6.55), 5.0, 0.9, facecolor=PURPLE, edgecolor="none"))
ax.text(6.0, 7, "COR = espessante", ha="center", va="center", fontsize=7.6, color="white", fontweight="bold")
ax.text(5, 5.2, "Lítio-complexo  •  NLGI 2", ha="center", fontsize=9.5, color=DARK, fontweight="bold")
ax.text(5, 4.2, "Código LIS: GLC-002-A1", ha="center", fontsize=10.5, color=ORANGE, fontweight="bold")
ax.text(5, 3.0, "Ponto: Motor Elétrico M-14\nLado Acoplado", ha="center", fontsize=8.5, color=DARK)
ax.text(5, 1.9, "(graxa — forma triangular = espessante)", ha="center", fontsize=7.4, color=GREY, style="italic")
ax.set_title("Etiqueta LIS — graxa (ilustrativo)", fontsize=10.8, fontweight="bold", color=DARK, pad=10)
fig.suptitle("LIS — Sistema de Identificação de Lubrificantes: elementos-chave da etiqueta", fontsize=12.5, fontweight="bold", color=DARK, y=0.99)
save(fig, "lub_13_etiqueta_lis.png", top=0.86)

# ==================================================================
# L10 - Escala de cor MPC (potencial de verniz) + tendencia RULER/RPVOT
# ==================================================================
fig, axs = plt.subplots(1, 2, figsize=(11, 4.6))
ax = axs[0]
n = 6
cmap_colors = ["#f4ecd8", "#e8d9a8", "#d9b96a", "#c08f3a", "#96602a", "#5c3a1a"]
for i, c in enumerate(cmap_colors):
    ax.add_patch(Circle((1 + i * 1.6, 1), 0.7, facecolor=c, edgecolor=DARK, linewidth=1.3))
    ax.text(1 + i * 1.6, -0.2, f"ΔE {i*10}-{i*10+10}", ha="center", fontsize=8, color=DARK)
ax.set_xlim(-0.5, 10); ax.set_ylim(-1, 2.2); ax.axis("off")
ax.text(4.5, 2.0, "MPC (Membrane Patch Colorimetry) — potencial de verniz", ha="center", fontsize=10.5, fontweight="bold", color=DARK)
ax = axs[1]
months = np.arange(0, 13)
ruler_pct = 100 - months * 6.5
rpvot_pct = 100 - months * 8.5
ax.plot(months, np.clip(ruler_pct, 0, 100), marker="o", color=BLUE, label="RULER — antioxidantes restantes (%)")
ax.plot(months, np.clip(rpvot_pct, 0, 100), marker="s", color=ORANGE, label="RPVOT — vida oxidativa restante (%)")
ax.axhline(25, color="#b5462a", linestyle="--", linewidth=1.2)
ax.text(0.3, 27, "Zona crítica (< 25%)", fontsize=8.3, color="#b5462a")
ax.set_xlabel("Meses em uso", fontsize=10)
ax.set_ylabel("% restante", fontsize=10)
ax.set_title("Tendência RULER x RPVOT ao longo do tempo", fontsize=11, fontweight="bold", color=DARK, pad=10)
ax.legend(fontsize=8.3, loc="upper right")
ax.grid(alpha=0.25)
ax.spines[["top", "right"]].set_visible(False)
fig.suptitle("Módulo L10 — Monitoramento de verniz e vida útil remanescente do óleo", fontsize=12.5, fontweight="bold", color=DARK, y=0.99)
save(fig, "lub_14_mpc_ruler_rpvot.png", top=0.86)

# ==================================================================
# L11 - Roda ASCEND (6 pilares da lubrificacao de classe mundial)
# ==================================================================
fig, ax = plt.subplots(figsize=(7.5, 7.5), subplot_kw={"projection": "polar"})
pillars = ["Seleção do\nlubrificante", "Recebimento\ne armazenamento", "Manuseio e\naplicação",
           "Controle de\ncontaminação", "Análise e\nmonitoramento", "Descarte\nambiental"]
n = len(pillars)
theta = np.linspace(0, 2 * np.pi, n, endpoint=False)
values = [1, 1, 1, 1, 1, 1]
colors_wheel = [BLUE, GREEN, ORANGE, PURPLE, YELLOW, "#3a8f8f"]
width = 2 * np.pi / n * 0.92
bars = ax.bar(theta, values, width=width, color=colors_wheel, edgecolor="white", linewidth=2, alpha=0.9)
ax.set_ylim(0, 1.3)
ax.set_yticks([])
ax.set_xticks(theta)
ax.set_xticklabels(pillars, fontsize=9.5, color=DARK)
ax.spines["polar"].set_visible(False)
ax.set_title("ASCEND — os 6 pilares da lubrificação de classe mundial (Noria)", fontsize=12.5, fontweight="bold", color=DARK, pad=28)
save(fig, "lub_15_ascend.png")

# ==================================================================
# L12 - Hierarquia de gestao do oleo usado
# ==================================================================
fig, ax = new_fig((8.5, 6))
levels = ["Reduzir\n(consolidação, precisão)", "Reutilizar\n(reprocessar/reclamar)",
          "Reciclar\n(re-refino, coprocessamento)", "Descartar\n(somente com coletor licenciado)"]
colors_pyr = [GREEN, BLUE, YELLOW, ORANGE]
widths = [7.5, 6, 4.5, 3]
y0 = 1.2
for i, (lvl, c, w) in enumerate(zip(levels, colors_pyr, widths)):
    y = y0 + i * 1.9
    ax.add_patch(Rectangle((5 - w / 2, y), w, 1.5, facecolor=c, edgecolor="white", linewidth=1.5, alpha=0.9))
    ax.text(5, y + 0.75, lvl, ha="center", va="center", fontsize=9.3, color="white", fontweight="bold")
ax.text(5, 0.4, "Prioridade decrescente de baixo para cima", ha="center", fontsize=9, color=DARK, style="italic")
save(fig, "lub_16_hierarquia_descarte.png")

print("\nTODOS OS DIAGRAMAS GERADOS EM", OUT)
