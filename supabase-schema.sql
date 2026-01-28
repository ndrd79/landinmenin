-- =============================================
-- ESTÂNCIA MENIN CMS - SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Execute este script no SQL Editor do Supabase
-- =============================================

-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABELA: configuracoes
-- Configurações gerais do site
-- =============================================
CREATE TABLE IF NOT EXISTS configuracoes (
  id INT PRIMARY KEY DEFAULT 1,
  whatsapp TEXT DEFAULT '',
  telefone TEXT DEFAULT '',
  horario_checkin TEXT DEFAULT '09:00',
  horario_checkout TEXT DEFAULT '22:00',
  capacidade INT DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configuração padrão
INSERT INTO configuracoes (id, whatsapp, telefone, horario_checkin, horario_checkout, capacidade)
VALUES (1, '', '', '09:00', '22:00', 50)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- TABELA: pacotes
-- Pacotes de preços
-- =============================================
CREATE TABLE IF NOT EXISTS pacotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT DEFAULT '',
  preco DECIMAL(10,2) NOT NULL,
  itens JSONB DEFAULT '[]',
  destaque BOOLEAN DEFAULT FALSE,
  cor_badge TEXT DEFAULT 'gray',
  ativo BOOLEAN DEFAULT TRUE,
  ordem INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir pacotes padrão
INSERT INTO pacotes (nome, titulo, descricao, preco, itens, destaque, cor_badge, ordem) VALUES
('basico', 'Sem Quarto', 'Apenas área externa', 550, '["Área externa completa", "Piscina", "Churrasqueira", "40 cadeiras", "10 mesas"]', FALSE, 'gray', 0),
('ventilador', 'Com Ventilador', '1 quarto com ventilador', 600, '["Tudo do básico", "1 quarto com ventilador"]', FALSE, 'blue', 1),
('ar', 'Com Ar', '1 quarto com ar condicionado', 650, '["Tudo do básico", "1 quarto com ar-condicionado"]', FALSE, 'cyan', 2),
('completo', 'Completo', '2 quartos com ar condicionado', 700, '["Tudo do básico", "2 quartos com ar-condicionado"]', TRUE, 'green', 3);

-- =============================================
-- TABELA: calendario
-- Agendamentos e disponibilidade
-- =============================================
CREATE TABLE IF NOT EXISTS calendario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data DATE NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('disponivel', 'reservado', 'promocao', 'indisponivel')),
  preco_especial DECIMAL(10,2),
  observacao TEXT,
  cliente_nome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: galeria
-- Fotos do site
-- =============================================
CREATE TABLE IF NOT EXISTS galeria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt TEXT DEFAULT '',
  ordem INT DEFAULT 0,
  secao TEXT NOT NULL CHECK (secao IN ('hero', 'galeria', 'estrutura')),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: avisos
-- Avisos e banners
-- =============================================
CREATE TABLE IF NOT EXISTS avisos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('info', 'promocao', 'alerta', 'evento')),
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: itens_estrutura
-- Itens da estrutura
-- =============================================
CREATE TABLE IF NOT EXISTS itens_estrutura (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  icone TEXT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  ordem INT DEFAULT 0
);

-- Inserir itens padrão
INSERT INTO itens_estrutura (nome, icone, ordem) VALUES
('Quiosque 154m²', 'deck', 0),
('Piscina Grande', 'pool', 1),
('40 Cadeiras', 'event_seat', 2),
('10 Mesas', 'table_restaurant', 3),
('2 Mesas Baralho', 'casino', 4),
('Mesa Mármore', 'countertops', 5),
('Internet Wi-Fi', 'wifi', 6),
('TV', 'tv', 7),
('Som', 'speaker', 8),
('Luz de Festa', 'celebration', 9),
('Churrasqueira', 'outdoor_grill', 10),
('Gás Cozinha', 'local_fire_department', 11),
('2 Banheiros', 'wc', 12),
('Cama Elástica', 'sports_gymnastics', 13),
('Freezer 400L', 'kitchen', 14),
('2 Geladeiras', 'kitchen', 15),
('2 Quiosques', 'yard', 16);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pacotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendario ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_estrutura ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública (Para visitantes - Role: anon)
CREATE POLICY "Leitura pública configuracoes" ON configuracoes FOR SELECT TO anon USING (true);
CREATE POLICY "Leitura pública pacotes" ON pacotes FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Leitura pública calendario" ON calendario FOR SELECT TO anon USING (true);
CREATE POLICY "Leitura pública galeria" ON galeria FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Leitura pública avisos" ON avisos FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Leitura pública itens_estrutura" ON itens_estrutura FOR SELECT TO anon USING (ativo = true);

-- Políticas de acesso total para Admin (Role: authenticated)
-- Otimizado com (SELECT auth.role()) e isolamento de role para evitar avisos de performance
CREATE POLICY "Escrita admin configuracoes" ON configuracoes FOR ALL TO authenticated USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Escrita admin pacotes" ON pacotes FOR ALL TO authenticated USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Escrita admin calendario" ON calendario FOR ALL TO authenticated USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Escrita admin galeria" ON galeria FOR ALL TO authenticated USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Escrita admin avisos" ON avisos FOR ALL TO authenticated USING ((SELECT auth.role()) = 'authenticated');
CREATE POLICY "Escrita admin itens_estrutura" ON itens_estrutura FOR ALL TO authenticated USING ((SELECT auth.role()) = 'authenticated');

-- =============================================
-- STORAGE BUCKET (executar separadamente)
-- =============================================
-- No painel do Supabase > Storage > Create bucket:
-- Nome: galeria
-- Público: SIM
-- Tamanho máximo: 5MB
-- Tipos permitidos: image/jpeg, image/png, image/webp

-- =============================================
-- CRIAR USUÁRIO ADMIN
-- =============================================
-- No painel do Supabase > Authentication > Users > Add user:
-- Email: meninagenda@gmail.com
-- Senha: (definir uma senha segura)
-- Auto confirm: SIM
