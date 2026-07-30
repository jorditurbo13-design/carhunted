# 🏁 CarHunted

App para "cazar" coches: eliges marca y modelo, subes la foto que le has hecho,
y se guarda en tu garaje. Los coches icónicos se marcan solos.

## Pasos para ponerla en marcha

### 1. Configurar Supabase (la base de datos)
1. Entra en tu proyecto de Supabase → menú izquierdo → **SQL Editor** → **New query**.
2. Abre el archivo `supabase-setup.sql` de este proyecto, copia TODO su contenido,
   pégalo en el editor y dale a **Run**.
3. Eso crea la tabla de coches, los permisos de seguridad, y el almacén de fotos.

También conviene desactivar la confirmación por email mientras pruebas (para no
tener que confirmar cada cuenta): Supabase → **Authentication** → **Providers** →
**Email** → desactiva "Confirm email". Puedes volver a activarlo cuando la app
esté lista de verdad.

### 2. Variables de entorno
1. Copia el archivo `.env.local.example` y renómbralo a `.env.local`.
2. Ya viene relleno con la URL y la clave pública de tu proyecto de Supabase.
   Si alguna vez cambias de proyecto, actualiza estos dos valores.

### 3. Probarlo en tu ordenador (opcional)
```bash
npm install
npm run dev
```
Abre http://localhost:3000

### 4. Subirlo a GitHub
Desde la carpeta del proyecto:
```bash
git init
git add .
git commit -m "CarHunted: primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/carhunted.git
git push -u origin main
```
(`.env.local` NO se sube, está en `.gitignore` a propósito, porque tiene tus
claves — eso está bien, es lo correcto)

### 5. Configurar Vercel
1. En tu proyecto de Vercel (el que ya está enlazado a este repo), ve a
   **Settings → Environment Variables**.
2. Añade las dos variables, iguales que en tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Ve a la pestaña **Deployments** y dale a **Redeploy** (o simplemente vuelve a
   hacer `git push`, Vercel despliega solo cada vez que subes cambios a GitHub).

¡Y ya está publicada en internet! 🎉
