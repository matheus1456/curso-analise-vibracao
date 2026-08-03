import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os

plt.rcParams.update({"font.size": 11, "axes.grid": True, "grid.alpha": 0.3})
OUT = "/tmp/imgs/"
os.makedirs(OUT, exist_ok=True)

def make_spectrum(peaks, xmax=10, noise=0.02, width=0.03, title="", xlabel="Ordens (x RPM)",
                   ylabel="Amplitude (mm/s RMS)", fname="fig.png", figsize=(7,3.6), annotate=True):
    x = np.linspace(0, xmax, 4000)
    y = np.abs(np.random.default_rng(7).normal(0, noise/3, size=x.shape))
    for order, amp, label in peaks:
        y += amp * np.exp(-((x-order)**2)/(2*width**2))
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(x, y, color="#1f5fa8", linewidth=1.1)
    ax.set_xlim(0, xmax)
    ax.set_ylim(0, max(p[1] for p in peaks)*1.35)
    ax.set_xlabel(xlabel); ax.set_ylabel(ylabel)
    ax.set_title(title, fontsize=12, fontweight="bold")
    if annotate:
        for order, amp, label in peaks:
            if label:
                ax.annotate(label, xy=(order, amp), xytext=(order, amp*1.08), ha="center", fontsize=8.5, color="#b5462a")
    fig.tight_layout(); fig.savefig(OUT+fname, dpi=150); plt.close(fig)
    print("saved", fname)

# 18. Desbalanceamento de acoplamento (força + momento) - axial e radial 1X, fase 180 entre planos
peaks=[(1,0.85,"1X radial"), (1.001,0.0,"")]
make_spectrum([(1,0.9,"1X\n(radial e axial)")], xmax=5, title="Desbalanceamento de acoplamento: 1X elevado em radial\ne também em axial (dois planos de correção)", fname="18_desbal_acoplamento.png")

# 19. Rotor em balanço (overhung) - alto 1x axial e radial
make_spectrum([(1,1.0,"1X (axial e\nradial altos)")], xmax=5, title="Desbalanceamento de rotor em balanço (overhung):\n1X elevado tanto em axial quanto em radial", fname="19_rotor_balanco.png")

# 20. Folga tipo A (estrutural) vs Tipo C comparação lado a lado -> single figure with two subplots
fig, axs = plt.subplots(1,2, figsize=(9,3.6))
x = np.linspace(0,6,3000)
yA = np.abs(np.random.default_rng(5).normal(0,0.01,x.shape))
for o,a in [(1,0.8),(2,0.3),(3,0.15)]:
    yA += a*np.exp(-((x-o)**2)/(2*0.03**2))
axs[0].plot(x,yA,color="#1f5fa8"); axs[0].set_title("Folga Tipo A (estrutural)\n1X dominante + poucos harmônicos", fontsize=10, fontweight="bold")
axs[0].set_xlabel("Ordens (x RPM)"); axs[0].set_ylabel("Amplitude (mm/s)")
yC = np.abs(np.random.default_rng(6).normal(0,0.02,x.shape))
for o,a in [(0.5,0.25),(1,0.6),(1.5,0.3),(2,0.5),(2.5,0.22),(3,0.42),(3.5,0.18),(4,0.32),(4.5,0.14),(5,0.24)]:
    yC += a*np.exp(-((x-o)**2)/(2*0.025**2))
axs[1].plot(x,yC,color="#1f5fa8"); axs[1].set_title("Folga Tipo C (ajuste impróprio)\nsérie completa de harmônicos e sub-harmônicos", fontsize=10, fontweight="bold")
axs[1].set_xlabel("Ordens (x RPM)")
fig.tight_layout(); fig.savefig(OUT+"20_folga_A_vs_C.png", dpi=150); plt.close(fig)
print("saved 20")

# 21. Barras de rotor quebradas - sidebands ao redor de 1X espaçadas em 2*fs*polos (pole pass freq)
fs_pp = 0.08  # order units around 1X
peaks=[(1-2*fs_pp,0.25,""),(1,1.0,"1X"),(1+2*fs_pp,0.25,""),(1+4*fs_pp,0.12,"")]
make_spectrum(peaks, xmax=1.6, width=0.008, title="Motor de indução — barras de rotor quebradas:\nbandas laterais em 1X espaçadas em 2×fp (frequência de polo)", fname="21_barras_rotor.png")

# 22. Forma de onda: dente de engrenagem quebrado - impacto periódico
t = np.linspace(0,0.3,6000)
sig = 0.05*np.sin(2*np.pi*40*t)
period = 0.06
for k in range(6):
    tc = k*period
    sig += 0.9*np.exp(-((t-tc)**2)/(2*0.0015**2))*np.sign(np.sin(2*np.pi*400*(t-tc)))
fig, ax = plt.subplots(figsize=(7,3.2))
ax.plot(t*1000, sig, color="#1f5fa8", linewidth=0.8)
ax.set_xlabel("Tempo (ms)"); ax.set_ylabel("Amplitude")
ax.set_title("Forma de onda no tempo: dente de engrenagem quebrado\n(impacto nítido a cada volta do eixo com defeito)", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"22_dente_quebrado_fo.png", dpi=150); plt.close(fig)
print("saved 22")

# 23. Diagrama de balanceamento vetorial (polar plot) - vetor original O, com peso teste O+T, vetor efeito T
fig, ax = plt.subplots(figsize=(5.5,5.5), subplot_kw={'projection':'polar'})
ax.set_theta_zero_location('E'); ax.set_theta_direction(1)
O = (0, 3.2)      # (angle rad, mag)
OT = (0.9, 4.6)
Tvec_angle = 2.35
Tvec_mag = 2.6
for (ang,mag,label,color) in [(O[0],O[1],"O (original)","#1f5fa8"), (OT[0],OT[1],"O+T (com peso teste)","#2a9d3e"), (Tvec_angle,Tvec_mag,"T (efeito do peso teste)","#b5462a")]:
    ax.annotate("", xy=(ang,mag), xytext=(0,0), arrowprops=dict(arrowstyle="->", color=color, lw=2))
    ax.text(ang, mag*1.12, label, fontsize=8.5, color=color, ha="center")
ax.set_ylim(0,6)
ax.set_title("Diagrama vetorial de balanceamento em 1 plano\n(método dos três vetores)", fontsize=11, fontweight="bold", pad=20)
fig.tight_layout(); fig.savefig(OUT+"23_vetor_balanceamento.png", dpi=150); plt.close(fig)
print("saved 23")

# 24. Diagrama de alinhamento (offset e angularidade) - dois eixos com desvio, vista lateral
fig, ax = plt.subplots(figsize=(7,3.2))
xline = np.linspace(0,10,100)
ax.plot(xline[:50], np.zeros(50), color="#333333", lw=6, solid_capstyle="butt")
yb = np.linspace(0, 0.9, 50)
ax.plot(xline[50:], yb, color="#333333", lw=6, solid_capstyle="butt")
ax.annotate("", xy=(5.3,0.15), xytext=(5.3,0), arrowprops=dict(arrowstyle="<->", color="#b5462a"))
ax.text(5.5,0.07,"Offset paralelo", color="#b5462a", fontsize=9)
ax.annotate("", xy=(9,0.85), xytext=(9,0.55), arrowprops=dict(arrowstyle="<->", color="#1f5fa8"))
ax.text(9.2,0.68,"Desvio\nangular", color="#1f5fa8", fontsize=9)
ax.set_xlim(0,10.5); ax.set_ylim(-0.3,1.2)
ax.axis("off")
ax.set_title("Desalinhamento de eixos: componentes de offset paralelo\ne desvio angular a serem corrigidos por calços", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"24_alinhamento_diagrama.png", dpi=150); plt.close(fig)
print("saved 24")

# 25. Espectro comparativo: baixa vs alta resolução (para ilustrar Fmax/resolução no módulo básico)
fig, axs = plt.subplots(1,2, figsize=(9,3.4))
x = np.linspace(7.5,8.5,3000)
y_lowres = np.abs(np.random.default_rng(9).normal(0,0.01,x.shape))
y_lowres += 0.9*np.exp(-((x-8.0)**2)/(2*0.09**2))
axs[0].plot(x,y_lowres,color="#1f5fa8"); axs[0].set_title("Baixa resolução:\nGMF e banda lateral se fundem em um pico só", fontsize=10, fontweight="bold")
axs[0].set_xlabel("Ordens (x RPM)"); axs[0].set_ylabel("Amplitude")
y_hires = np.abs(np.random.default_rng(10).normal(0,0.01,x.shape))
for o,a in [(7.9,0.25),(8.0,0.9),(8.1,0.25)]:
    y_hires += a*np.exp(-((x-o)**2)/(2*0.012**2))
axs[1].plot(x,y_hires,color="#1f5fa8"); axs[1].set_title("Alta resolução:\nGMF e bandas laterais claramente separadas", fontsize=10, fontweight="bold")
axs[1].set_xlabel("Ordens (x RPM)")
fig.tight_layout(); fig.savefig(OUT+"25_resolucao_comparativa.png", dpi=150); plt.close(fig)
print("saved 25")

print("done")
