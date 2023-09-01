---
title: '[UAI 2023] Mitigating Transformer Overconfidence via Lipschitz Regularization'
draft: false
featured: true
weight: 3
heroHeading: 'Mitigating Transformer Overconfidence via Lipschitz Regularization'
heroSubHeading: ''
heroBackground: '/images/32109555763_eb9bb215ef_k.jpg'
---

![title](/images/lrformer.jpg)

Though Transformers have achieved promising results in many computer vision tasks, they tend to be over-confident in predictions, as the standard Dot Product Self-Attention (DPSA) can barely preserve distance for the unbounded input domain. In this work, we fill this gap by proposing a novel Lipschitz Regularized Transformer (LRFormer). Specifically, we present a new similarity function with the distance within Banach Space to ensure the Lipschitzness and also regularize the term by a contractive Lipschitz Bound. The proposed method is analyzed with a theoretical guarantee, providing a rigorous basis for its effectiveness and reliability. Extensive experiments conducted on standard vision benchmarks demonstrate that our method outperforms the state-of-the-art single forward pass approaches in prediction, calibration, and uncertainty estimation.         


