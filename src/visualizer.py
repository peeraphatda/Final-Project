"""
Module: visualizer.py
Role: Coder 2 (ปลั๊ก)
Description: เรนเดอร์จานสี Visual Swatches ด้วย Matplotlib
"""
import matplotlib.pyplot as plt

class PaletteVisualizer:
    @staticmethod
    def plot_palette(emotion: str, colors: list, score: float):
        fig, ax = plt.subplots(figsize=(8, 2))
        fig.patch.set_facecolor('#1e1e2e')
        ax.set_facecolor('#1e1e2e')
        
        for i, color in enumerate(colors):
            ax.add_patch(plt.Rectangle((i, 0), 1, 1, color=color))
            ax.text(i + 0.5, -0.2, color, ha='center', va='top', fontsize=10, color='white', fontweight='bold')
            
        ax.set_xlim(0, len(colors))
        ax.set_ylim(0, 1)
        ax.axis('off')
        plt.title(f"Emotion: {emotion.upper()} (Confidence: {score*100:.1f}%)", color='white', fontsize=14, pad=15)
        plt.tight_layout()
        plt.show()