# -*- coding: utf-8 -*-
"""Diagramas esquemáticos ORIGINAIS baseados nos conceitos do Manual de
Manutenção de Rolamentos da SKF (pé manco, alinhamento de correias,
designação de rolamentos, tolerâncias de alinhamento e montagem).
Mesmo estilo visual dos demais gráficos do curso. Não são reproduções
das figuras do manual original."""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon, Circle, FancyBboxPatch
from matplotlib.transforms import Affine2D
import os

plt.rcParams.update({"font.size": 11})
OUT = "/tmp/imgs3/"
os.makedirs(OUT, exist_ok=True)

BLUE, ORANGE, GREEN = "#1f5fa8", "#b5462a", "#2a9d3e"
GREY, LGREY, DARK = "#6b7280", "#c9ced6", "#1a2733"
PURPLE, TEAL = "#7c3aed", "#0e7490"

def save(fig, fname):
    fig.savefig(OUT + fname, dpi=150, facecolor="white", bbox_inches="tight")
    plt.close(fig)
    print("saved", fname)

# ==================================================================
# 1. Pé manco: apoio correto x paralelo x angular
# ==================================================================
fig, axs = plt.subplots(1, 3, figsize=(12.5, 4.8))
cases = [
    ("Apoio correto", "O pé assenta em toda a superfície.\nApertar o parafuso não deforma a carcaça.", GREEN, "ok"),
    ('Pé manco paralelo ("pé curto")', "O pé está paralelo à base, mas não\nencosta nela. Correção: preencher o\nvão com calços.", ORANGE, "par"),
    ('Pé manco angular ("pé em ângulo")', "Só uma parte do pé apoia na base.\nCorreção: calço em cunha ou\nelemento nivelador ajustável.", ORANGE, "ang"),
]
for ax, (t, desc, col, kind) in zip(axs, cases):
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")
    ax.add_patch(Rectangle((0.4, 2.0), 9.2, 1.2, facecolor=LGREY, edgecolor=GREY, linewidth=1.4))
    ax.text(5, 2.6, "fundação / base", ha="center", va="center", fontsize=9, color=DARK)
    if kind == "ok":
        ax.add_patch(Polygon([(2.4, 3.2), (7.6, 3.2), (7.6, 4.6), (2.4, 4.6)],
                     facecolor="#dbeafe", edgecolor=BLUE, linewidth=2.2))
    elif kind == "par":
        ax.add_patch(Polygon([(2.4, 4.35), (7.6, 4.35), (7.6, 5.75), (2.4, 5.75)],
                     facecolor="#fde8e0", edgecolor=ORANGE, linewidth=2.2))
        ax.annotate("", xy=(3.3, 3.22), xytext=(3.3, 4.33),
                    arrowprops=dict(arrowstyle="<->", color=ORANGE, lw=2.0))
        ax.text(2.95, 3.78, "vão\nlivre", ha="right", va="center", fontsize=9,
                color=ORANGE, fontweight="bold")
    else:
        ax.add_patch(Polygon([(2.4, 3.2), (7.6, 4.55), (7.6, 5.95), (2.4, 4.6)],
                     facecolor="#fde8e0", edgecolor=ORANGE, linewidth=2.2))
        ax.annotate("", xy=(7.15, 3.22), xytext=(7.15, 4.43),
                    arrowprops=dict(arrowstyle="<->", color=ORANGE, lw=2.0))
        ax.text(6.8, 3.8, "abre em\nângulo", ha="right", va="center", fontsize=9,
                color=ORANGE, fontweight="bold")
    ax.plot([5, 5], [2.0, 7.0], color=DARK, lw=2.4, zorder=3)
    ax.add_patch(Rectangle((4.5, 6.55), 1.0, 0.5, facecolor=DARK, edgecolor=DARK, zorder=4))
    ax.text(5, 9.6, t, ha="center", va="top", fontsize=11, fontweight="bold", color=col, wrap=True)
    ax.text(5, 1.5, desc, ha="center", va="top", fontsize=8.8, color=DARK)
fig.suptitle("Tipos de pé manco (soft foot) — classificação SKF",
             fontsize=13.5, fontweight="bold", color=DARK, y=1.04)
save(fig, "skf_01_pe_manco.png")

# ==================================================================
# 2. Três tipos de desalinhamento de correia (com vista indicada)
# ==================================================================
fig, axs = plt.subplots(1, 3, figsize=(12.5, 4.8))

def pulley(ax, x, ycen, angle=0.0, color=BLUE, face="#dbeafe", w=0.55, h=2.4):
    r = Rectangle((x - w / 2, ycen - h / 2), w, h, facecolor=face,
                  edgecolor=color, linewidth=2.2)
    if angle:
        r.set_transform(Affine2D().rotate_deg_around(x, ycen, angle) + ax.transData)
    ax.add_patch(r)

# --- (a) ângulo vertical / torcido : VISTA FRONTAL, polia inclinada no plano vertical
ax = axs[0]
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")
ax.text(5, 9.9, "Desalinhamento de ângulo vertical\n(torcido)", ha="center", va="top",
        fontsize=11, fontweight="bold", color=ORANGE)
ax.text(5, 7.75, "vista frontal (de lado)", ha="center", va="top", fontsize=8.5,
        color=GREY, style="italic")
pulley(ax, 2.5, 5.0, angle=0)
pulley(ax, 7.5, 5.0, angle=17, color=ORANGE, face="#fde8e0")
ax.plot([2.5, 7.5], [6.2, 6.9], color=GREY, lw=2)
ax.plot([2.5, 7.5], [3.8, 4.5], color=GREY, lw=2)
ax.plot([1.4, 3.6], [5.0, 5.0], color=GREY, lw=1.2, ls=":")
ax.plot([6.4, 8.6], [5.0, 5.0], color=GREY, lw=1.2, ls=":")
ax.text(5, 2.85, "As polias são paralelas, mas uma está\ntorcida no plano vertical.\n"
                 "Correção: ajustar a altura dos pés\ndianteiros ou traseiros da máquina móvel.",
        ha="center", va="top", fontsize=8.8, color=DARK)

# --- (b) ângulo horizontal : VISTA DE CIMA, eixos não paralelos
ax = axs[1]
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")
ax.text(5, 9.9, "Desalinhamento de ângulo horizontal", ha="center", va="top",
        fontsize=11, fontweight="bold", color=ORANGE)
ax.text(5, 7.75, "vista de cima", ha="center", va="top", fontsize=8.5,
        color=GREY, style="italic")
pulley(ax, 2.5, 5.0, angle=0, h=1.5)
pulley(ax, 7.5, 5.0, angle=22, color=ORANGE, face="#fde8e0", h=1.5)
ax.plot([2.5, 7.5], [5.75, 6.35], color=GREY, lw=2)
ax.plot([2.5, 7.5], [4.25, 4.85], color=GREY, lw=2)
ax.annotate("", xy=(8.9, 5.0), xytext=(8.9, 6.35),
            arrowprops=dict(arrowstyle="-", color=ORANGE, lw=0))
ax.plot([7.5, 9.3], [5.0, 5.0], color=GREY, lw=1.2, ls=":")
ax.plot([7.5, 9.15], [5.0, 5.72], color=ORANGE, lw=1.4, ls="--")
ax.text(9.4, 5.4, "α", ha="left", va="center", fontsize=11, color=ORANGE, fontweight="bold")
ax.text(5, 2.85, "Os eixos das duas polias não estão\nparalelos entre si.\n"
                 "Correção: deslizar lateralmente a parte\ndianteira ou traseira da máquina móvel.",
        ha="center", va="top", fontsize=8.8, color=DARK)

# --- (c) paralelo (offset) : VISTA DE CIMA, polia adiantada no eixo
ax = axs[2]
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")
ax.text(5, 9.9, "Desalinhamento paralelo (offset)", ha="center", va="top",
        fontsize=11, fontweight="bold", color=ORANGE)
ax.text(5, 7.75, "vista de cima", ha="center", va="top", fontsize=8.5,
        color=GREY, style="italic")
pulley(ax, 2.5, 4.3, angle=0, h=1.5)
pulley(ax, 7.5, 5.9, angle=0, color=ORANGE, face="#fde8e0", h=1.5)
ax.plot([2.5, 7.5], [5.05, 6.65], color=GREY, lw=2)
ax.plot([2.5, 7.5], [3.55, 5.15], color=GREY, lw=2)
ax.plot([1.2, 9.2], [4.3, 4.3], color=GREY, lw=1.2, ls=":")
ax.annotate("", xy=(8.9, 4.3), xytext=(8.9, 5.9),
            arrowprops=dict(arrowstyle="<->", color=ORANGE, lw=2.0))
ax.text(9.15, 5.1, "offset", ha="left", va="center", fontsize=9,
        color=ORANGE, fontweight="bold")
ax.text(5, 2.85, "Os eixos são paralelos, mas uma polia\nestá adiantada em relação à outra.\n"
                 "Correção: mover a polia ao longo do eixo\n(ou a máquina para frente/para trás).",
        ha="center", va="top", fontsize=8.8, color=DARK)

fig.suptitle("Os três tipos de desalinhamento de correia/polia — SKF",
             fontsize=13.5, fontweight="bold", color=DARK, y=1.04)
save(fig, "skf_02_desalinhamento_correias.png")

# ==================================================================
# 3. Anatomia da designação de um rolamento (posições medidas do render)
# ==================================================================
fig, ax = plt.subplots(figsize=(12, 6.2))
ax.set_xlim(0, 12); ax.set_ylim(0, 10); ax.axis("off")
ax.text(6, 9.9, "Como ler a designação de um rolamento SKF", ha="center", va="top",
        fontsize=14, fontweight="bold", color=DARK)

CODE = "6205-2RS1/C3"
txt = ax.text(6, 7.9, CODE, ha="center", va="center", fontsize=34,
              fontweight="bold", color=DARK, family="monospace")
fig.canvas.draw()
bb = txt.get_window_extent(renderer=fig.canvas.get_renderer())
inv = ax.transData.inverted()
x0, _ = inv.transform((bb.x0, bb.y0)); x1, _ = inv.transform((bb.x1, bb.y1))
cw = (x1 - x0) / len(CODE)          # largura exata de 1 caractere monoespaçado

def seg_center(i, j):
    return x0 + cw * (i + j) / 2.0

# recolore cada trecho por cima do texto base
segs = [(0, 1, BLUE), (1, 2, GREEN), (2, 4, ORANGE), (4, 9, PURPLE), (9, 12, TEAL)]
for i, j, col in segs:
    ax.text(x0 + cw * i, 7.9, CODE[i:j], ha="left", va="center", fontsize=34,
            fontweight="bold", color=col, family="monospace")

notes = [
    (seg_center(0, 1),  "1º algarismo — TIPO",  "6 = rolamento rígido\nde esferas, uma carreira", BLUE,   6.05, 1.40),
    (seg_center(1, 2),  "série de DIMENSÕES",   "2 = série de diâmetros 2\n(dimensões ISO)",       GREEN,  3.75, 3.10),
    (seg_center(2, 4),  "código de TAMANHO",    "05 × 5 = 25 mm\nde diâmetro do furo",            ORANGE, 6.05, 5.05),
    (seg_center(4, 9),  "SUFIXO de VEDAÇÃO",    "2RS1 = vedação de contato\nde borracha nos dois lados", PURPLE, 3.75, 7.55),
    (seg_center(9, 12), "SUFIXO de FOLGA",      "C3 = folga interna maior\nque a Normal (CN)",     TEAL,   6.05, 10.55),
]
for cx, lab, desc, col, ytop, xtxt in notes:
    ax.plot([cx, cx], [7.25, ytop + 1.15], color=col, lw=1.5, ls="--")
    ax.plot([cx, xtxt], [ytop + 1.15, ytop + 1.15], color=col, lw=1.5, ls="--")
    ax.plot([xtxt, xtxt], [ytop + 1.15, ytop + 1.0], color=col, lw=1.5, ls="--")
    ax.text(xtxt, ytop + 0.92, lab, ha="center", va="top", fontsize=9.4,
            fontweight="bold", color=col)
    ax.text(xtxt, ytop + 0.15, desc, ha="center", va="top", fontsize=8.5, color=DARK)

ax.add_patch(FancyBboxPatch((0.4, 0.3), 11.2, 1.5, boxstyle="round,pad=0.14",
                            facecolor="#f1f5f9", edgecolor=LGREY, linewidth=1.2))
ax.text(6, 1.4, "Regra prática: os dois últimos algarismos da designação básica × 5 = diâmetro do furo, em mm.",
        ha="center", va="center", fontsize=9.6, color=DARK, fontweight="bold")
ax.text(6, 0.8, "Vale para furos de 20 a 495 mm. Abaixo de 10 mm e a partir de 500 mm o valor vem escrito direto,\n"
                "separado por barra — por exemplo 618/8 (furo de 8 mm) e 511/530 (furo de 530 mm).",
        ha="center", va="center", fontsize=8.5, color=DARK)
save(fig, "skf_03_designacao_rolamento.png")

# ==================================================================
# 4. Tolerâncias de alinhamento de eixos x rotação
# ==================================================================
fig, axs = plt.subplots(1, 2, figsize=(11.5, 4.6))
rot_lab = ["até 1000", "1000–2000", "2000–3000", "3000–4000", "4000–6000"]
x = np.arange(len(rot_lab)); w = 0.36
data = [([0.07, 0.05, 0.03, 0.02, 0.02], [0.13, 0.10, 0.07, 0.05, 0.03],
         "Desalinhamento radial (paralelo)", "mm"),
        ([0.06, 0.05, 0.04, 0.03, 0.03], [0.10, 0.08, 0.07, 0.06, 0.05],
         "Desalinhamento angular", "mm por 100 mm")]
for ax, (e, a, tit, un) in zip(axs, data):
    ax.bar(x - w / 2, e, w, label="Excelente", color=GREEN, edgecolor=DARK, linewidth=0.6)
    ax.bar(x + w / 2, a, w, label="Aceitável", color=ORANGE, edgecolor=DARK, linewidth=0.6)
    for xi, (ve, va_) in enumerate(zip(e, a)):
        ax.text(xi - w / 2, ve + 0.003, f"{ve:.2f}", ha="center", fontsize=7.8, color=DARK)
        ax.text(xi + w / 2, va_ + 0.003, f"{va_:.2f}", ha="center", fontsize=7.8, color=DARK)
    ax.set_xticks(x); ax.set_xticklabels(rot_lab, fontsize=8.4)
    ax.set_xlabel("Rotação [r/min]", fontsize=9)
    ax.set_ylabel(un, fontsize=9)
    ax.set_title(tit, fontsize=11, fontweight="bold", color=DARK)
    ax.legend(fontsize=8.5, frameon=False)
    ax.grid(axis="y", linestyle=":", alpha=0.5); ax.set_axisbelow(True)
fig.suptitle("Diretrizes SKF de tolerância de alinhamento de eixos — quanto maior a rotação, mais apertada a tolerância",
             fontsize=11.5, fontweight="bold", color=DARK, y=1.03)
save(fig, "skf_04_tolerancias_alinhamento.png")

# ==================================================================
# 5. Montagem: onde aplicar a força axial (certo x errado)
# ==================================================================
fig, axs = plt.subplots(1, 2, figsize=(12, 5.4))
for ax, ok in zip(axs, [True, False]):
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")
    col = GREEN if ok else ORANGE
    tit = ("CORRETO — a luva empurra o ANEL INTERNO"
           if ok else "ERRADO — a luva empurra o ANEL EXTERNO")
    ax.text(5, 9.85, tit, ha="center", va="top", fontsize=11, fontweight="bold", color=col)
    ax.text(5, 9.05, "montagem em eixo (ajuste com interferência no anel interno)",
            ha="center", va="top", fontsize=8.4, color=GREY, style="italic")

    # eixo
    ax.add_patch(Rectangle((0.5, 2.3), 9.0, 1.5, facecolor=LGREY, edgecolor=GREY, linewidth=1.4))
    ax.text(1.5, 3.05, "eixo", ha="center", va="center", fontsize=9.5, color=DARK)

    # anel interno (sobre o eixo) / esferas / anel externo
    ax.add_patch(Rectangle((5.3, 3.8), 2.5, 0.95, facecolor="#dbeafe",
                           edgecolor=BLUE, linewidth=2.2))
    ax.text(6.55, 4.27, "anel interno", ha="center", va="center", fontsize=8.6, color=BLUE)
    for cx in (5.75, 6.55, 7.35):
        ax.add_patch(Circle((cx, 5.28), 0.34, facecolor="white", edgecolor=BLUE, linewidth=1.9))
    ax.add_patch(Rectangle((5.3, 5.8), 2.5, 0.95, facecolor="#e2e8f0",
                           edgecolor=BLUE, linewidth=2.2))
    ax.text(6.55, 6.27, "anel externo", ha="center", va="center", fontsize=8.6, color=BLUE)
    ax.text(8.05, 5.28, "elementos\nrolantes", ha="left", va="center", fontsize=8.2, color=GREY)
    ax.text(6.55, 7.05, "rolamento em corte", ha="center", va="bottom", fontsize=8.2,
            color=GREY, style="italic")

    # luva de montagem + forca axial
    ytop_sleeve, h_sleeve = (3.8, 0.95) if ok else (5.8, 0.95)
    ax.add_patch(Rectangle((4.55, ytop_sleeve), 0.6, h_sleeve,
                           facecolor=col, edgecolor=DARK, linewidth=1.2, alpha=0.85))
    ycen = ytop_sleeve + h_sleeve / 2
    ax.annotate("", xy=(4.5, ycen), xytext=(2.6, ycen),
                arrowprops=dict(arrowstyle="-|>", color=col, lw=3.4, mutation_scale=24))
    ax.text(3.55, ycen + 0.45, "força de\nmontagem", ha="center", va="bottom",
            fontsize=9, fontweight="bold", color=col)
    if ok:
        ax.text(4.85, ytop_sleeve - 0.3, "luva", ha="center", va="top", fontsize=8, color=DARK)
    else:
        ax.text(4.85, ytop_sleeve + h_sleeve + 0.12, "luva", ha="center", va="bottom",
                fontsize=8, color=DARK)

    # caminho da carga
    if ok:
        msg = ("A força entra e sai pelo mesmo anel — o anel de ajuste justo.\n"
               "As pistas e os elementos rolantes não são carregados.")
    else:
        ax.annotate("", xy=(6.55, 4.75), xytext=(6.55, 5.8),
                    arrowprops=dict(arrowstyle="-|>", color=ORANGE, lw=2.4,
                                    linestyle=":", mutation_scale=16))
        ax.text(5.15, 5.28, "carga passa\npelas esferas", ha="right", va="center",
                fontsize=8, color=ORANGE, fontweight="bold")
        msg = ("A carga atravessa os elementos rolantes e marca as pistas\n"
               "(endentações) antes mesmo de a máquina partir.")
    ax.text(5, 1.85, msg, ha="center", va="top", fontsize=8.8, color=col)

fig.suptitle("Regra de ouro da montagem: a força nunca deve ser transmitida através dos elementos rolantes",
             fontsize=12, fontweight="bold", color=DARK, y=1.02)
save(fig, "skf_05_montagem_forca.png")
