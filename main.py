data_gejala = [
    {'kode_gejala': 'G01', 'nama_gejala': 'Bulu rontok'},
    {'kode_gejala': 'G07', 'nama_gejala': 'Menggaruk telinga berlebih'},
    {'kode_gejala': 'G09', 'nama_gejala': 'Kulit bersisik'},
    {'kode_gejala': 'G10', 'nama_gejala': 'Gangguan pencernaan'},
    {'kode_gejala': 'G12', 'nama_gejala': 'Lemah lesu'},
    {'kode_gejala': 'G08', 'nama_gejala': 'Radang'},
]

belief = 0.6
plausibility = 1 - belief

m1 = ['p01','p02','p06','p07']
m2 = ['p02','p11']

m_sama = []

for i in range(len(m1)):
    for j in range(len(m2)):
        if m1[i] == m2[j]:
            m_sama.append(m1[i])

print(m_sama)

def rumus_ds(belief_m1, belief_m2):
    plasuability_m1 = 1 - belief_m1
    plasuability_m2 = 1 - belief_m2

    belief1_belief2 = belief_m1 * belief_m2
    p1_belief2 = plasuability_m1 * belief_m2
    belief1_p2 = belief_m1 * plasuability_m2
    p1_p2 = plasuability_m1 * plasuability_m2

    hasil1 = (belief1_belief2 + p1_belief2) / 1 - 0
    hasil2 = belief1_p2 / 1 - 0
    hasil3 = (p1_p2) / 1 - 0
    print('Nilai belief M3 {P02} = ', hasil1)
    print('Nilai belief M3 {P01,P02,P06,P07} = ', hasil2)
    print('Nilai belief M3 0 = ', hasil3)

rumus_ds(0.6, 0.8)
