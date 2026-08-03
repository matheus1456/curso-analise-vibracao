#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rodada J (item 3): 4 diagramas ilustrativos de morfologia de partículas de
desgaste, um por mecanismo, para exercícios visuais de ferrografia analítica
na Prática de Diagnóstico. Diagramas ILUSTRATIVOS (esquemáticos), não fotos
reais de microscopia — deixado explícito na legenda de cada exercício.
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Circle, Ellipse, FancyBboxPatch
import os

plt.rcParams.update({"font.size": 11})
OUT = "/tmp/imgs_ferro/"
os.makedirs(OUT, exist_ok=True)

BLUE = "#1f5fa8"
ORANGE = "#b5462a"
GREEN = "#2a9d3e"
GREY = "#6b7280"
LGREY = "#c9ced6"
DARK = "#1a2733"
YELLOW = "#d1a02a"
RUST = "#a83c1f"
SILVER = "#8a94a6"

def new_fig(figsize=(8, 6)):
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_xlim(0, 10); ax.set_ylim(0, 10)
    ax.axis("off")
    ax.add_patch(FancyBboxPatch((0.15, 0.15), 9.7, 9.7, boxstyle="round,pad=0.02,rounding_size=0.15",
                                 linewidth=1.4, edgecolor=GREY, facecolor="#f4f6f9"))
    return fig, ax

def title(ax, text, y=9.35):
    ax.text(5, y, text, ha="center", va="top", fontsize=12.5, fontweight="bold", color=DARK)

def subcaption(ax, text, y=0.55):
    ax.text(5, y, text, ha="center", va="bottom", fontsize=9.3, color=GREY, style="italic", wrap=True)

def save(fig, fname):
    fig.tight_layout()
    fig.savefig(OUT + fname, dpi=150, facecolor="white")
    plt.close(fig)
    print("saved", fname)

rng = np.random.default_rng(7)

# ------------------------------------------------------------------
# 1) Partículas de DESGASTE POR CORTE (cutting wear) - lascas espiraladas/lineares
# ------------------------------------------------------------------
fig, ax = new_fig()
title(ax, "Ferrografia — Amostra A")
ax.add_patch(FancyBboxPatch((0.6, 1.3), 8.8, 7.2, boxstyle="round,pad=0.02,rounding_size=0.1",
                             linewidth=1, edgecolor=LGREY, facecolor="white"))
def spiral_chip(cx, cy, scale, rot, color):
    t = np.linspace(0, 3.4 * np.pi, 60)
    r = scale * (0.15 + 0.10 * t / t.max())
    x = cx + r * np.cos(t + rot)
    y = cy + r * np.sin(t + rot) * 0.6
    ax.plot(x, y, color=color, linewidth=3.2, solid_capstyle="round")
    ax.plot(x, y, color="white", linewidth=1.0, alpha=0.35)
for (cx, cy, sc, rot) in [(2.3,6.3,1.5,0.3),(4.8,4.6,1.9,2.1),(7.2,6.7,1.3,4.0),(3.4,3.0,1.1,1.2),(6.6,3.3,1.6,5.2)]:
    spiral_chip(cx, cy, sc, rot, SILVER)
# straight linear scratches around
for (x0,y0,dx,dy) in [(1.2,2.0,1.4,0.3),(8.0,2.2,1.0,0.6),(1.0,7.6,0.9,-0.2)]:
    ax.plot([x0, x0+dx],[y0, y0+dy], color=GREY, linewidth=1.6)
subcaption(ax, "Diagrama esquemático (não é foto real de microscopia)")
save(fig, "ferro_A_corte.png")

# ------------------------------------------------------------------
# 2) Partículas LAMINARES (fadiga avançada / spalling) - placas finas irregulares
# ------------------------------------------------------------------
fig, ax = new_fig()
title(ax, "Ferrografia — Amostra B")
ax.add_patch(FancyBboxPatch((0.6, 1.3), 8.8, 7.2, boxstyle="round,pad=0.02,rounding_size=0.1",
                             linewidth=1, edgecolor=LGREY, facecolor="white"))
def laminar_plate(cx, cy, w, h, rot_deg, color):
    verts = np.array([[-w/2,-h/2],[w/2,-h*0.35],[w*0.4,h/2],[-w*0.45,h*0.3]])
    th = np.radians(rot_deg)
    R = np.array([[np.cos(th),-np.sin(th)],[np.sin(th),np.cos(th)]])
    verts = verts @ R.T + np.array([cx, cy])
    ax.add_patch(Polygon(verts, closed=True, facecolor=color, edgecolor=DARK, linewidth=1.0, alpha=0.92))
for (cx,cy,w,h,rot) in [(2.6,6.5,2.0,1.1,15),(5.2,5.8,2.4,1.3,-25),(7.6,6.4,1.8,1.0,40),
                         (3.6,3.4,2.1,1.0,-10),(6.6,3.0,1.9,1.1,20),(1.8,3.8,1.4,0.8,60)]:
    laminar_plate(cx, cy, w, h, rot, SILVER)
subcaption(ax, "Diagrama esquemático (não é foto real de microscopia)")
save(fig, "ferro_B_laminar.png")

# ------------------------------------------------------------------
# 3) Partículas ESFÉRICAS (fadiga subsuperficial inicial)
# ------------------------------------------------------------------
fig, ax = new_fig()
title(ax, "Ferrografia — Amostra C")
ax.add_patch(FancyBboxPatch((0.6, 1.3), 8.8, 7.2, boxstyle="round,pad=0.02,rounding_size=0.1",
                             linewidth=1, edgecolor=LGREY, facecolor="white"))
spheres = [(2.2,6.5,0.28),(3.1,5.6,0.20),(4.6,6.9,0.24),(5.8,5.3,0.30),(7.1,6.4,0.22),
           (2.6,3.6,0.26),(4.1,3.1,0.20),(5.6,3.8,0.24),(7.4,3.3,0.28),(6.5,4.9,0.18),
           (3.6,4.6,0.16),(8.2,5.4,0.20)]
for (cx,cy,r) in spheres:
    ax.add_patch(Circle((cx,cy), r, facecolor=SILVER, edgecolor=DARK, linewidth=0.8))
    ax.add_patch(Circle((cx-r*0.3,cy+r*0.3), r*0.35, facecolor="white", alpha=0.55, linewidth=0))
subcaption(ax, "Diagrama esquemático (não é foto real de microscopia)")
save(fig, "ferro_C_esferica.png")

# ------------------------------------------------------------------
# 4) Partículas de ÓXIDO / FERRUGEM (corrosão)
# ------------------------------------------------------------------
fig, ax = new_fig()
title(ax, "Ferrografia — Amostra D")
ax.add_patch(FancyBboxPatch((0.6, 1.3), 8.8, 7.2, boxstyle="round,pad=0.02,rounding_size=0.1",
                             linewidth=1, edgecolor=LGREY, facecolor="white"))
def rust_blob(cx, cy, s, color):
    t = np.linspace(0, 2*np.pi, 14)
    r = s * (1 + 0.35 * rng.uniform(-1,1,size=t.shape))
    x = cx + r * np.cos(t)
    y = cy + r * np.sin(t)
    ax.add_patch(Polygon(np.c_[x,y], closed=True, facecolor=color, edgecolor="#5c1f0d", linewidth=0.7, alpha=0.9))
for (cx,cy,s) in [(2.3,6.4,0.5),(3.6,5.5,0.35),(5.0,6.7,0.45),(6.6,6.0,0.55),(7.9,6.9,0.3),
                  (2.8,3.7,0.4),(4.3,3.2,0.5),(5.9,3.7,0.35),(7.3,3.4,0.45),(4.9,4.6,0.3)]:
    rust_blob(cx, cy, s, RUST if rng.random() > 0.3 else "#c25a2e")
subcaption(ax, "Diagrama esquemático (não é foto real de microscopia)")
save(fig, "ferro_D_oxido.png")

print("done")
