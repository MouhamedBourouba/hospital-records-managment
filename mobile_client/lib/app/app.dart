import 'package:flutter/material.dart';
import 'package:mobile_client/app/providers.dart';
import 'package:mobile_client/ui/screens/login_screen.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return AppProviders(
      MaterialApp(
        title: 'records managment',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        ),
        home: LoginScreen(),
      ),
    );
  }
}
