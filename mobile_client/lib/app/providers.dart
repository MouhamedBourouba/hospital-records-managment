import 'package:flutter/material.dart';
import 'package:mobile_client/ui/providers/authentication_provider.dart';
import 'package:provider/provider.dart';

class AppProviders extends StatelessWidget {
  final Widget _child;
  const AppProviders(this._child, {super.key});

  @override
  Widget build(BuildContext context) => MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => AuthenticationProvider()),
    ],
    child: _child,
  );
}
