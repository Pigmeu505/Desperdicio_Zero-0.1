-- Inserir receitas de exemplo

INSERT INTO public.recipes (title, description, ingredients, instructions, prep_time, difficulty, video_url, image_url, nutrition) VALUES
(
  'Omelete de Queijo',
  'Um omelete cremoso e delicioso perfeito para qualquer refeição',
  '["2 ovos", "50g queijo ralado", "1 colher de sopa de leite", "sal a gosto", "pimenta a gosto"]',
  ARRAY['Bata os ovos com o leite, sal e pimenta', 'Aqueça uma frigideira antiaderente', 'Despeje a mistura na frigideira', 'Adicione o queijo quando começar a firmar', 'Dobre ao meio e sirva'],
  10,
  'Fácil',
  'https://www.youtube.com/embed/qJGKdEVtI1k',
  '/placeholder.svg?height=200&width=300',
  '{"calorias": 280, "proteinas": "18g", "carboidratos": "2g", "gorduras": "22g"}'
),
(
  'Salada de Frutas Tropical',
  'Uma refrescante salada de frutas com toque tropical',
  '["1 manga", "1 abacaxi pequeno", "2 bananas", "1 maçã", "suco de 1 limão", "2 colheres de sopa de mel"]',
  ARRAY['Corte todas as frutas em cubos', 'Misture o suco de limão com o mel', 'Combine as frutas em uma tigela', 'Regue com a mistura de limão e mel', 'Misture delicadamente e sirva'],
  15,
  'Fácil',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '/placeholder.svg?height=200&width=300',
  '{"calorias": 120, "proteinas": "1g", "carboidratos": "30g", "gorduras": "0g"}'
),
(
  'Macarrão ao Alho e Óleo',
  'Clássico italiano simples e saboroso',
  '["400g macarrão espaguete", "4 dentes de alho", "100ml azeite extra virgem", "pimenta vermelha a gosto", "salsa picada", "queijo parmesão ralado"]',
  ARRAY['Cozinhe o macarrão em água salgada', 'Aqueça o azeite em uma frigideira', 'Refogue o alho laminado até dourar', 'Adicione a pimenta vermelha', 'Misture o macarrão escorrido na frigideira', 'Finalize com salsa e parmesão'],
  20,
  'Médio',
  'https://www.youtube.com/embed/bJUiWdM__Qw',
  '/placeholder.svg?height=200&width=300',
  '{"calorias": 450, "proteinas": "12g", "carboidratos": "65g", "gorduras": "18g"}'
);
