"use client";

import React from 'react';
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button';

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to access this page.
      </p>
      <Button onClick={redirect('/dashboard/courses')} className="font-semibold bg-sky-500 hover:bg-sky-600 text-white">
        Go to Courses
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
