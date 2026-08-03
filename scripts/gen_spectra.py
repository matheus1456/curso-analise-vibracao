import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

plt.rcParams.update({
    "font.size": 11,
    "axes.grid": True,
    "grid.alpha": 0.3,
})

OUT = "/tmp/imgs/"
import os
os.makedirs(OUT, exist_ok=True)

def make_spectrum(peaks, xmax=10, noise=0.02, width=0.03, title="", xlabel="Ordens (x RPM)",
                   ylabel="Amplitude (mm/s RMS)", fname="fig.png", figsize=(7,3.6), annotate=True):
    x = np.linspace(0, xmax, 4000)
    y = np.abs(np.random.default_rng(1).normal(0, noise/3, size=x.shape))
    for order, amp, label in peaks:
        y += amp * np.exp(-((x-order)**2)/(2*width**2))
    fig, ax = plt.subplots(figsize=figsize)
    ax.plot(x, y, color="#1f5fa8", linewidth=1.1)
    ax.set_xlim(0, xmax)
    ax.set_ylim(0, max(p[1] for p in peaks)*1.35)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    ax.set_title(title, fontsize=12, fontweight="bold")
    if annotate:
        for order, amp, label in peaks:
            if label:
                ax.annotate(label, xy=(order, amp), xytext=(order, amp*1.08),
                            ha="center", fontsize=8.5, color="#b5462a")
    fig.tight_layout()
    fig.savefig(OUT+fname, dpi=150)
    plt.close(fig)
    print("saved", fname)

# 1. Desbalanceamento
make_spectrum(
    [(1,1.0,"1X\ndominante"), (2,0.08,""), (3,0.05,"")],
    xmax=6, title="Espectro típico: Desbalanceamento de massa", fname="01_desbalanceamento.png")

# 2. Desalinhamento angular
make_spectrum(
    [(1,0.5,"1X"), (2,0.9,"2X\ndominante"), (3,0.2,"3X")],
    xmax=6, title="Espectro típico: Desalinhamento angular", fname="02_desalinhamento_angular.png")

# 3. Desalinhamento paralelo
make_spectrum(
    [(1,0.6,"1X"), (2,1.0,"2X\ndominante"), (3,0.35,"3X"), (4,0.15,"4X")],
    xmax=6, title="Espectro típico: Desalinhamento paralelo", fname="03_desalinhamento_paralelo.png")

# 4. Folga mecânica (subharmônicos + harmônicos)
peaks = [(0.5,0.25,"0,5X"),(1,0.7,"1X"),(1.5,0.3,"1,5X"),(2,0.55,"2X"),(2.5,0.2,"2,5X"),
         (3,0.4,"3X"),(3.5,0.15,""),(4,0.3,"4X"),(4.5,0.12,""),(5,0.22,"5X")]
make_spectrum(peaks, xmax=6.5, title="Espectro típico: Folga mecânica (série de harmônicos e sub-harmônicos)",
              fname="04_folga_mecanica.png")

# 5. Eixo empenado (bent shaft)
make_spectrum(
    [(1,1.0,"1X (axial alto)"), (2,0.7,"2X")],
    xmax=5, title="Espectro típico: Eixo empenado (medição axial)", fname="05_eixo_empenado.png")

# 6. Rolamento estágio 1
x = np.linspace(0,10,4000)
fig, ax = plt.subplots(figsize=(7,3.6))
y = np.abs(np.random.default_rng(2).normal(0,0.03,x.shape))
ax.plot(x,y,color="#1f5fa8", linewidth=1.1)
ax.set_ylim(0,0.3)
ax.set_xlabel("Frequência (kHz) — faixa ultrassônica")
ax.set_ylabel("gSE (Spike Energy)")
ax.set_title("Rolamento – Estágio 1: sem picos discretos, leve\naumento do nível de Spike Energy (gSE)", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"06_rolamento_estagio1.png", dpi=150); plt.close(fig)
print("saved 06")

# 7. Rolamento estágio 2
peaks = [(4.6,0.15,""),(4.8,0.35,""),(5.0,0.55,"Fn do\nrolamento"),(5.2,0.35,""),(5.4,0.15,"")]
make_spectrum(peaks, xmax=8, width=0.05, title="Rolamento – Estágio 2: bandas laterais surgindo\nem torno da frequência natural (Fn)",
              fname="07_rolamento_estagio2.png")

# 8. Rolamento estágio 3
peaks=[]
bpfo=3.5
for h,amp in [(1,0.7),(2,0.55),(3,0.4),(4,0.3),(5,0.2)]:
    peaks.append((bpfo*h,amp, f"{h}xBPFO" if h in (1,2,3) else ""))
    peaks.append((bpfo*h-1,amp*0.35,""))
    peaks.append((bpfo*h+1,amp*0.35,""))
make_spectrum(peaks, xmax=20, width=0.08, title="Rolamento – Estágio 3: harmônicos de BPFO com\nbandas laterais em 1X RPM", fname="08_rolamento_estagio3.png")

# 9. Rolamento estágio 4
x = np.linspace(0,10,4000)
rng = np.random.default_rng(3)
y = np.abs(rng.normal(0,0.18,x.shape))
for order,amp in [(1,0.9),(2,0.6),(3,0.5),(4,0.4),(5,0.35),(6,0.3)]:
    y += amp*np.exp(-((x-order)**2)/(2*0.03**2))
fig, ax = plt.subplots(figsize=(7,3.6))
ax.plot(x,y,color="#1f5fa8", linewidth=1.0)
ax.set_xlim(0,10); ax.set_ylim(0,1.3)
ax.set_xlabel("Ordens (x RPM)"); ax.set_ylabel("Amplitude (mm/s RMS)")
ax.set_title("Rolamento – Estágio 4: piso de ruído elevado e\nharmônicos de 1X RPM contaminados (falha iminente)", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"09_rolamento_estagio4.png", dpi=150); plt.close(fig)
print("saved 09")

# 10. Engrenagens
gmf = 8.0
peaks = [(1,0.15,"1X"), (2,0.08,"2X"), (gmf-1,0.25,""), (gmf,0.9,"GMF"), (gmf+1,0.25,""),
         (2*gmf,0.15,"2xGMF")]
make_spectrum(peaks, xmax=18, width=0.08, title="Engrenagens: GMF com bandas laterais em 1X RPM\n(engrenamento desgastado)", fname="10_engrenagens.png")

# 11. Correias
peaks=[(0.3,0.2,"Fcorreia"),(0.6,0.5,"2xFcorreia\n(dominante)"),(0.9,0.3,"3x"),(1.2,0.15,"4x"),(1,0.35,"1X RPM")]
make_spectrum(peaks, xmax=3, width=0.03, title="Espectro típico: Problemas em correias (V-belt)", fname="11_correias.png")

# 12. Elétrico
peaks=[(1,0.3,"1X"),(2,0.2,"2X"),(4.0,0.95,"2xFL = 120 Hz\n(problema no estator)")]
make_spectrum(peaks, xmax=4.5, width=0.04, title="Espectro típico: Problema elétrico no estator (2x frequência de linha)", fname="12_eletrico.png")

# 13. BPF bomba
peaks=[(1,0.3,"1X"),(2,0.15,"2X"),(6,0.9,"BPF = Nº pás x RPM"),(12,0.3,"2xBPF")]
make_spectrum(peaks, xmax=14, width=0.08, title="Espectro típico: Bomba centrífuga — Frequência de\nPassagem de Pás (BPF)", fname="13_bomba_bpf.png")

# 14. Cavitação
x = np.linspace(0,20,4000)
rng = np.random.default_rng(4)
y = np.abs(rng.normal(0.15,0.12,x.shape))
y += 0.9*np.exp(-((x-6)**2)/(2*0.1**2))
fig, ax = plt.subplots(figsize=(7,3.6))
ax.plot(x,y,color="#1f5fa8", linewidth=1.0)
ax.set_xlim(0,20); ax.set_ylim(0,1.3)
ax.set_xlabel("Ordens (x RPM)"); ax.set_ylabel("Amplitude (mm/s RMS)")
ax.set_title("Cavitação em bomba: ruído aleatório de banda larga\nsobreposto ao BPF", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"14_cavitacao.png", dpi=150); plt.close(fig)
print("saved 14")

# 15. Batimento
x = np.linspace(0,2,4000)
f1,f2=0.95,1.05
fig, ax = plt.subplots(figsize=(7,3.6))
ax.plot([f1,f1],[0,1],color="#1f5fa8", linewidth=2)
ax.plot([f2,f2],[0,1],color="#1f5fa8", linewidth=2)
ax.annotate("F1", xy=(f1,1.02), ha="center", fontsize=9, color="#b5462a")
ax.annotate("F2", xy=(f2,1.02), ha="center", fontsize=9, color="#b5462a")
ax.set_xlim(0,2); ax.set_ylim(0,1.2)
ax.set_xlabel("Ordens (x RPM)"); ax.set_ylabel("Amplitude (mm/s RMS)")
ax.set_title("Vibração de batimento: dois picos muito próximos\n(F1 - F2 = frequência de batimento)", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"15_batimento.png", dpi=150); plt.close(fig)
print("saved 15")

# 16. Ressonância
rpm = np.linspace(0,3000,500)
fn = 1500
amp = 1/np.sqrt((1-(rpm/fn)**2)**2 + (2*0.05*(rpm/fn))**2)
amp = amp/amp.max()
fig, ax1 = plt.subplots(figsize=(7,3.8))
ax1.plot(rpm, amp, color="#1f5fa8", linewidth=1.5)
ax1.axvline(fn, color="#b5462a", linestyle="--", linewidth=1)
ax1.annotate("Frequência\nnatural (Fn)", xy=(fn, 1.0), xytext=(fn+150,0.85), fontsize=9, color="#b5462a")
ax1.set_xlabel("Velocidade de rotação (RPM)")
ax1.set_ylabel("Amplitude normalizada")
ax1.set_title("Curva de resposta em ressonância (amplificação dinâmica)", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"16_ressonancia.png", dpi=150); plt.close(fig)
print("saved 16")

# 17. Envelope
t = np.linspace(0,0.2,4000)
carrier = np.sin(2*np.pi*500*t)
mod = 1 + 0.8*np.where((np.sin(2*np.pi*30*t))>0.9, 1, 0)
sig = carrier*mod*0.3
fig, ax = plt.subplots(figsize=(7,3.2))
ax.plot(t*1000, sig, color="#1f5fa8", linewidth=0.8)
ax.set_xlabel("Tempo (ms)")
ax.set_ylabel("Amplitude")
ax.set_title("Forma de onda no tempo: impactos periódicos de\ndefeito modulando a frequência de ressonância", fontsize=11, fontweight="bold")
fig.tight_layout(); fig.savefig(OUT+"17_forma_onda_envelope.png", dpi=150); plt.close(fig)
print("saved 17")

print("done")
