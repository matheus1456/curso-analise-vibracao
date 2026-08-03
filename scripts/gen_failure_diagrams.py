import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Wedge, Rectangle, FancyArrowPatch, Ellipse, Polygon
import os

plt.rcParams.update({"font.size": 11})
OUT = "/tmp/imgs2/"
os.makedirs(OUT, exist_ok=True)

BLUE = "#1f5fa8"
ORANGE = "#b5462a"
GREEN = "#2a9d3e"
GREY = "#6b7280"
LGREY = "#c9ced6"
DARK = "#1a2733"

def new_fig(figsize=(9, 4)):
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_xlim(0, 10); ax.set_ylim(0, 10)
    ax.axis("off")
    return fig, ax

def title(ax, text, y=9.6):
    ax.text(5, y, text, ha="center", va="top", fontsize=12.5, fontweight="bold", color=DARK)

def save(fig, fname):
    fig.tight_layout()
    fig.savefig(OUT + fname, dpi=150, facecolor="white")
    plt.close(fig)
    print("saved", fname)

# ---------------------------------------------------------------
# 26. Zonas de carga normais - corte transversal esquemático
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 2, figsize=(10, 5))
labels = [
    ("Anel externo estacionário\nAnel interno girante", "Zona de carga fixa\nno anel externo (~150°)"),
    ("Anel interno estacionário\nAnel externo girante", "Zona de carga fixa\nno anel interno (~150°)"),
]
for i, ax in enumerate(axs):
    ax.set_xlim(-1.6, 1.6); ax.set_ylim(-1.6, 1.6); ax.set_aspect("equal"); ax.axis("off")
    outer = Circle((0, 0), 1.35, facecolor="none", edgecolor=BLUE, linewidth=2.2)
    inner = Circle((0, 0), 0.55, facecolor="none", edgecolor=BLUE, linewidth=2.2)
    ax.add_patch(outer); ax.add_patch(inner)
    n_balls = 10
    for k in range(n_balls):
        ang = 2 * np.pi * k / n_balls
        bx, by = 0.95 * np.cos(ang), 0.95 * np.sin(ang)
        ax.add_patch(Circle((bx, by), 0.13, facecolor="#dfe7f2", edgecolor=BLUE, linewidth=1.1))
    # load zone wedge (~150 deg centered at bottom, 270deg = down)
    if i == 0:
        wedge = Wedge((0, 0), 1.35, 195, 345, width=0.28, facecolor=ORANGE, alpha=0.55)
    else:
        wedge = Wedge((0, 0), 0.55, 195, 345, width=0.16, facecolor=ORANGE, alpha=0.6)
    ax.add_patch(wedge)
    ax.annotate("", xy=(0, -1.55), xytext=(0, -2.0),
                arrowprops=dict(arrowstyle="-|>", color=DARK, lw=2))
    ax.text(0, -2.1, "Carga radial\nconstante", ha="center", va="top", fontsize=9.5, color=DARK)
    ax.text(0, 1.72, labels[i][0], ha="center", va="bottom", fontsize=10, fontweight="bold", color=DARK)
    ax.text(0, -2.75, labels[i][1], ha="center", va="top", fontsize=9, color=ORANGE, fontweight="bold")
fig.suptitle("Zonas de carga normais: o padrão de pista fica sempre no anel ESTACIONÁRIO,\ncentrado na direção da carga (~150° de arco)", fontsize=12, fontweight="bold", y=1.0)
fig.subplots_adjust(top=0.8)
save(fig, "26_zonas_carga_normais.png")

# ---------------------------------------------------------------
# 27. Padrões de pista "desenrolados" - normal vs condições anormais
# ---------------------------------------------------------------
fig, axs = plt.subplots(2, 2, figsize=(10.5, 6.2))
def raceway_strip(ax, band_fn, ttl, sub, dashed_extra=None):
    ax.set_xlim(0, 10); ax.set_ylim(0, 3); ax.axis("off")
    ax.add_patch(Rectangle((0.3, 0.3), 9.4, 2.0, facecolor="#eef2f7", edgecolor=GREY, linewidth=1.3))
    x = np.linspace(0.3, 9.7, 400)
    y_center = 1.3 + band_fn(x)
    width = 0.55
    ax.fill_between(x, y_center - width/2, y_center + width/2, color=ORANGE, alpha=0.65, linewidth=0)
    if dashed_extra:
        y2 = 1.3 + dashed_extra(x)
        ax.fill_between(x, y2 - width/2, y2 + width/2, color=ORANGE, alpha=0.65, linewidth=0)
    ax.text(5, 2.62, ttl, ha="center", va="bottom", fontsize=10.3, fontweight="bold", color=DARK)
    ax.text(5, 0.05, sub, ha="center", va="top", fontsize=8.8, color=ORANGE)

raceway_strip(axs[0,0], lambda x: 0*x, "Normal — carga unidirecional constante", "faixa central, largura uniforme")
raceway_strip(axs[0,1], lambda x: 0.55*np.sin((x-0.3)/9.4*2*np.pi), "Desalinhamento do anel", "faixa desloca de um lado ao outro (larga, 150°-360°)")
raceway_strip(axs[1,0], lambda x: 0*x, "Anel ovalizado / mancal fora de círculo", "duas zonas de carga diametralmente opostas",
              dashed_extra=lambda x: np.where((x>5.0), 0, np.nan))
axs[1,0].clear(); axs[1,0].set_xlim(0,10); axs[1,0].set_ylim(0,3); axs[1,0].axis("off")
axs[1,0].add_patch(Rectangle((0.3, 0.3), 9.4, 2.0, facecolor="#eef2f7", edgecolor=GREY, linewidth=1.3))
axs[1,0].add_patch(Rectangle((0.3, 1.02), 4.3, 0.55, facecolor=ORANGE, alpha=0.65))
axs[1,0].add_patch(Rectangle((5.4, 1.02), 4.3, 0.55, facecolor=ORANGE, alpha=0.65))
axs[1,0].text(5, 2.62, "Anel ovalizado / mancal fora de círculo", ha="center", va="bottom", fontsize=10.3, fontweight="bold", color=DARK)
axs[1,0].text(5, 0.05, "duas (ou mais) zonas de carga diametralmente opostas", ha="center", va="top", fontsize=8.8, color=ORANGE)
raceway_strip(axs[1,1], lambda x: 0*x, "Ajuste justo / pré-carga", "faixa central mais LARGA que o normal, mesma posição")
axs[1,1].collections[-1].set_alpha(0.65)
for ax_row in axs:
    for ax in ax_row:
        pass
fig.suptitle("Padrões de pista \"desenrolados\" (360° da pista em linha reta):\ncomo cada condição de operação assina sua própria marca característica", fontsize=12.2, fontweight="bold", y=1.0)
fig.subplots_adjust(top=0.82)
save(fig, "27_zonas_carga_anormais.png")

# ---------------------------------------------------------------
# 28. Fadiga: subsuperficial (progressão a-b-c-d) e superficial
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 4, figsize=(12, 3.4))
stages = [
    "a) Partícula é\nsoterrada na pista",
    "b) Trinca inicia\nsob a superfície\n(0,1 – 0,5 mm)",
    "c) Trinca se propaga\naté a superfície",
    "d) Lascamento\n(spalling) — indentação\noriginal já não é visível",
]
for i, ax in enumerate(axs):
    ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
    ax.add_patch(Rectangle((0.5, 0.5), 9, 3.2, facecolor="#dfe7f2", edgecolor=BLUE, linewidth=1.5))
    ax.annotate("", xy=(5, 4.6), xytext=(5, 5.6), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=2))
    ax.text(5, 5.75, "carga", ha="center", fontsize=8.5, color=DARK)
    if i == 0:
        ax.add_patch(Circle((5, 3.55), 0.22, facecolor=GREY, edgecolor=DARK))
    elif i == 1:
        ax.add_patch(Circle((5, 3.55), 0.18, facecolor=GREY, edgecolor=DARK, alpha=0.6))
        ax.plot([4.6, 5.4], [2.3, 2.3], color=ORANGE, linewidth=2.4)
    elif i == 2:
        ax.plot([4.6, 5.4], [2.3, 2.3], color=ORANGE, linewidth=2.4)
        ax.plot([5.0, 5.15], [2.3, 3.7], color=ORANGE, linewidth=2.4)
    else:
        crater = Wedge((5, 3.7), 0.9, 200, 340, facecolor="white", edgecolor=ORANGE, linewidth=2)
        ax.add_patch(crater)
        ax.text(5, 1.3, "spall", color=ORANGE, ha="center", fontsize=9, fontweight="bold")
    ax.text(5, 0.1, stages[i], ha="center", va="bottom", fontsize=8.8, color=DARK)
fig.suptitle("Fadiga subsuperficial: da partícula soterrada ao lascamento (spalling)\ntrinca típica a 0,1–0,5 mm de profundidade, sob a zona de máxima tensão de cisalhamento", fontsize=11.8, fontweight="bold", y=1.0)
fig.subplots_adjust(top=0.72)
save(fig, "28_fadiga_subsuperficial.png")

# ---------------------------------------------------------------
# 29. Desgaste: abrasivo (fosco) vs adesivo (esfolamento/smearing)
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 2, figsize=(10, 4.6))
rng = np.random.default_rng(3)
ax = axs[0]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#d7dbe0", edgecolor=GREY, linewidth=1.3))
for _ in range(140):
    x0, y0 = rng.uniform(0.6, 9.4), rng.uniform(0.8, 3.9)
    ax.plot([x0, x0+rng.uniform(-0.15,0.15)], [y0, y0+rng.uniform(-0.15,0.15)], color=GREY, linewidth=0.6, alpha=0.7)
ax.text(5, 4.5, "Desgaste abrasivo", ha="center", fontsize=11, fontweight="bold", color=DARK)
ax.text(5, 0.15, "superfície fosca e opaca — remoção progressiva\nde material por partículas duras / lubrificação inadequada", ha="center", va="bottom", fontsize=8.8, color=ORANGE)

ax = axs[1]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#e3c9b8", edgecolor=GREY, linewidth=1.3))
for k in range(5):
    y0 = 1.1 + k*0.7
    ax.add_patch(Ellipse((2.2+k*1.4, y0), 1.3, 0.4, facecolor="#8a5a3b", alpha=0.75, angle=8))
ax.annotate("", xy=(8.6, 3.6), xytext=(6.6, 1.4), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=1.8))
ax.text(7.9, 2.7, "deslizamento\n+ calor", fontsize=8, color=DARK, ha="center")
ax.text(5, 4.5, "Desgaste adesivo (smearing)", ha="center", fontsize=11, fontweight="bold", color=DARK)
ax.text(5, 0.15, "transferência de material entre superfícies —\naquecimento por atrito, solda e arrancamento localizado", ha="center", va="bottom", fontsize=8.8, color=ORANGE)
save(fig, "29_desgaste_abrasivo_adesivo.png")

# ---------------------------------------------------------------
# 30. Corrosão: por umidade (pites) vs por atrito (fretting / false brinelling)
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 2, figsize=(10, 4.6))
ax = axs[0]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#cdd3da", edgecolor=GREY, linewidth=1.3))
rng2 = np.random.default_rng(11)
for _ in range(90):
    x0, y0 = rng2.uniform(0.7, 9.3), rng2.uniform(0.9, 3.8)
    ax.add_patch(Circle((x0, y0), rng2.uniform(0.03, 0.09), facecolor="#8a3b2b", alpha=0.85, linewidth=0))
ax.text(5, 4.5, "Corrosão por umidade", ha="center", fontsize=11, fontweight="bold", color=DARK)
ax.text(5, 0.15, "pites de oxidação (ferrugem) espalhados —\nágua ou agentes corrosivos venceram o lubrificante", ha="center", va="bottom", fontsize=8.8, color=ORANGE)

ax = axs[1]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#cdd3da", edgecolor=GREY, linewidth=1.3))
for k in range(7):
    xc = 1.2 + k*1.2
    ax.add_patch(Ellipse((xc, 2.4), 0.55, 2.6, facecolor="#8a3b2b", alpha=0.8))
ax.text(5, 4.5, "Corrosão por atrito (fretting / false brinelling)", ha="center", fontsize=10.6, fontweight="bold", color=DARK)
ax.text(5, 0.15, "sulcos paralelos no espaçamento dos elementos rolantes —\nmicromovimento sob vibração com a máquina parada", ha="center", va="bottom", fontsize=8.8, color=ORANGE)
save(fig, "30_corrosao.png")

# ---------------------------------------------------------------
# 31. Erosão elétrica: tensão excessiva (crateras) vs corrente de fuga (fluting)
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 2, figsize=(10, 4.6))
ax = axs[0]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#3a3f47", edgecolor=GREY, linewidth=1.3))
rng3 = np.random.default_rng(21)
for _ in range(10):
    x0, y0 = rng3.uniform(1.2, 8.8), rng3.uniform(1.2, 3.4)
    ax.add_patch(Circle((x0, y0), rng3.uniform(0.22, 0.42), facecolor="#1c1e22", edgecolor="#d98c3f", linewidth=1.6))
ax.text(5, 4.5, "Erosão por tensão excessiva", ha="center", fontsize=10.8, fontweight="bold", color="white")
ax.text(5, 0.15, "crateras grandes (até ~0,5 mm) com borda de\nmaterial fundido — \"solda a arco\" pontual", ha="center", va="bottom", fontsize=8.8, color="#f0b57a")

ax = axs[1]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#3a3f47", edgecolor=GREY, linewidth=1.3))
x = np.linspace(0.6, 9.4, 400)
for k in range(9):
    xc = 0.9 + k*1.0
    ax.plot([xc, xc], [0.9, 3.9], color="#6b6f76", linewidth=3.5, alpha=0.9)
ax.text(5, 4.5, "Erosão por corrente de fuga (fluting)", ha="center", fontsize=10.8, fontweight="bold", color="white")
ax.text(5, 0.15, "crateras pequenas e próximas que evoluem para\nsulcos paralelos (\"fluting\") — padrão tipo lavanderia", ha="center", va="bottom", fontsize=8.8, color="#f0b57a")
save(fig, "31_erosao_eletrica.png")

# ---------------------------------------------------------------
# 32. Deformação plástica: indentação por manuseio vs por partícula (com spall)
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 2, figsize=(10, 4.6))
ax = axs[0]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#dfe3e8", edgecolor=GREY, linewidth=1.3))
for k in range(6):
    xc = 1.3 + k*1.4
    ax.add_patch(Circle((xc, 2.4), 0.28, facecolor="none", edgecolor=ORANGE, linewidth=2.2))
ax.text(5, 4.5, "Indentação por sobrecarga / manuseio", ha="center", fontsize=10.6, fontweight="bold", color=DARK)
ax.text(5, 0.15, "depressões espaçadas no passo dos elementos rolantes\n(choque, montagem incorreta, impacto)", ha="center", va="bottom", fontsize=8.8, color=ORANGE)

ax = axs[1]
ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
ax.add_patch(Rectangle((0.4, 0.6), 9.2, 3.6, facecolor="#dfe3e8", edgecolor=GREY, linewidth=1.3))
ax.add_patch(Circle((4.2, 2.4), 0.3, facecolor="none", edgecolor=GREY, linewidth=2))
ax.add_patch(Wedge((5.6, 2.4), 0.7, 60, 300, facecolor="white", edgecolor=ORANGE, linewidth=2.2))
ax.annotate("", xy=(6.6, 2.4), xytext=(3.5, 2.4), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=1.6))
ax.text(5, 1.15, "sentido do rolamento", fontsize=8, color=DARK, ha="center")
ax.text(5, 4.5, "Indentação por partícula → lascamento", ha="center", fontsize=10.6, fontweight="bold", color=DARK)
ax.text(5, 0.15, "spall em formato de V nasce na borda de saída\nda indentação original (fadiga secundária)", ha="center", va="bottom", fontsize=8.8, color=ORANGE)
save(fig, "32_deformacao_plastica.png")

# ---------------------------------------------------------------
# 33. Fratura: forçada, por fadiga (marcas de praia) e térmica
# ---------------------------------------------------------------
fig, axs = plt.subplots(1, 3, figsize=(12, 4))
titles = ["Fratura forçada", "Fratura por fadiga", "Trinca térmica"]
subs = [
    "trinca única e irregular —\nimpacto / sobretensão",
    "\"marcas de praia\" concêntricas —\npropagação cíclica até ruptura",
    "trincas paralelas em ângulo reto\nao deslizamento — calor de atrito",
]
for i, ax in enumerate(axs):
    ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
    ax.add_patch(Circle((5, 3.2), 2.2, facecolor="#e7eaee", edgecolor=BLUE, linewidth=2))
    if i == 0:
        ax.plot([3.2, 6.8], [4.6, 1.9], color=ORANGE, linewidth=2.6)
        ax.plot([4.4, 5.6], [2.0, 4.3], color=ORANGE, linewidth=1.4, alpha=0.7)
    elif i == 1:
        for r in np.linspace(0.4, 2.0, 5):
            ax.add_patch(Wedge((5, 3.2), r, 200, 340, facecolor="none", edgecolor=ORANGE, linewidth=1.4))
        ax.plot([5, 5], [1.2, 5.2], color=ORANGE, linewidth=2.2)
    else:
        for k in range(5):
            xc = 3.6 + k*0.75
            ax.plot([xc, xc+0.35], [4.6, 1.9], color=ORANGE, linewidth=1.8)
    ax.text(5, 5.75, titles[i], ha="center", fontsize=11, fontweight="bold", color=DARK)
    ax.text(5, 0.3, subs[i], ha="center", va="bottom", fontsize=8.6, color=ORANGE)
save(fig, "33_fratura.png")

# ---------------------------------------------------------------
# 34. Fluxograma de diagnóstico por sintoma
# ---------------------------------------------------------------
fig, ax = new_fig((11, 6.6))
def box(x, y, w, h, text, color=BLUE, tcolor="white", fs=9.3):
    ax.add_patch(Rectangle((x, y), w, h, facecolor=color, edgecolor=DARK, linewidth=1.1, joinstyle="round"))
    ax.text(x+w/2, y+h/2, text, ha="center", va="center", fontsize=fs, color=tcolor, fontweight="bold", wrap=True)
def arrow(x0, y0, x1, y1):
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0), arrowprops=dict(arrowstyle="-|>", color=DARK, lw=1.5))

box(3.6, 8.6, 2.8, 1.0, "Sintoma observado\nno rolamento", color=DARK)
syms = [
    ("Calor\nexcessivo", 0.3, "Lubrificação incorreta,\nfolga interna errada,\npré-carga, atrito de vedação"),
    ("Ruído\nexcessivo", 2.75, "Contato metal-metal,\ncontaminação,\najuste frouxo"),
    ("Vibração\nexcessiva", 5.2, "Deslizamento,\nindentações, spalls,\najuste frouxo"),
    ("Folga /\nmovimento\ndo eixo", 7.65, "Anéis soltos,\nfolga interna incorreta,\nspalls avançados"),
]
for label, x, cause in syms:
    box(x, 6.4, 2.15, 1.1, label, color=ORANGE, fs=9.3)
    arrow(4.9, 8.6, x+1.07, 7.5)
    box(x, 4.4, 2.15, 1.6, cause, color="#eef2f7", tcolor=DARK, fs=8.0)
    arrow(x+1.07, 6.4, x+1.07, 6.0)
ax.text(5, 3.9, "Confirmar com inspeção física + espectro de vibração  →  classificar pelo modo de falha ISO 15243", ha="center", fontsize=9.6, color=DARK, style="italic")
box(2.6, 2.2, 4.8, 1.0, "Registrar evidências, fotografar\ne consultar o catálogo de modos de falha", color=GREEN)
arrow(5, 4.4, 5, 3.2)
title(ax, "Roteiro rápido de diagnóstico: do sintoma à causa provável", y=10.0)
save(fig, "34_fluxograma_diagnostico.png")

print("ALL DONE")
