// frontend/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // التحقق من صحة secret في المسار
    const url = req.nextUrl;
    const pathParts = url.pathname.split('/');
    
    // التأكد من أن المسار يبدأ بـ /admin
    if (pathParts[1] === 'admin') {
      const providedSecret = pathParts[2];
      const validSecret = process.env.ADMIN_SECRET;
      
      // إذا كان secret غير صحيح (أو غير موجود)، نعيد توجيه إلى 404
      if (providedSecret !== validSecret) {
        return NextResponse.rewrite(new URL('/404', req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const url = req.nextUrl;
        const pathParts = url.pathname.split('/');
        
        // السماح بصفحة تسجيل الدخول بدون مصادقة (بشرط صحة secret)
        if (pathParts[1] === 'admin' && pathParts[3] === 'login') {
          return true;
        }
        
        // باقي صفحات admin تتطلب مصادقة
        return !!token;
      },
    },
    pages: {
      signIn: `/admin/${process.env.ADMIN_SECRET}/login`,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};